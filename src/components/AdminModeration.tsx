import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  dismissModerationReport,
  getModerationReports,
  ModerationAction,
  ModerationReport,
  ModerationReportStatus,
  ReportTargetType,
  suspendModerationTarget,
  warnModerationTarget,
} from './API/apiManager';

type Filters = {
  status: 'all' | ModerationReportStatus;
  targetType: 'all' | ReportTargetType;
  query: string;
};

const fallbackReports: ModerationReport[] = [
  {
    id: 101,
    targetType: 'announcement',
    targetId: 'headline-1',
    targetLabel: 'Annonce Paris → Cayenne',
    reason: 'Annonce trompeuse',
    description: 'Le prix annoncé change après contact.',
    reporterEmail: 'client@example.com',
    status: 'open',
    createdAt: '2026-07-03T10:30:00.000Z',
  },
  {
    id: 102,
    targetType: 'member',
    targetId: 1,
    targetLabel: 'Profil John Doe',
    reason: 'Comportement abusif',
    description: 'Messages insistants après refus.',
    reporterEmail: 'voyageur@example.com',
    status: 'open',
    createdAt: '2026-07-03T11:15:00.000Z',
  },
  {
    id: 103,
    targetType: 'registration',
    targetLabel: 'Inscription mineur',
    reason: 'Tentative inscription mineur',
    description: 'Date de naissance détectée sous 18 ans.',
    reporterEmail: 'mineur@example.com',
    status: 'warned',
    createdAt: '2026-07-03T12:05:00.000Z',
  },
];

const statusLabels: Record<ModerationReportStatus, string> = {
  open: 'Ouvert',
  dismissed: 'Classé',
  warned: 'Averti',
  suspended: 'Suspendu',
};

const targetLabels: Record<ReportTargetType, string> = {
  announcement: 'Annonce',
  member: 'Profil',
  registration: 'Inscription',
};

const actionLabels: Record<ModerationAction, string> = {
  dismiss: 'Classer',
  warn: 'Avertir',
  suspend: 'Suspendre',
};

const AdminModeration = () => {
  const [isAdmin] = useState(
    () => window.localStorage.getItem('chaye_is_admin') === 'true',
  );
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    targetType: 'all',
    query: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    setIsLoading(true);
    getModerationReports()
      .then((apiReports) => {
        setReports(apiReports.length > 0 ? apiReports : fallbackReports);
      })
      .catch(() => {
        setReports(fallbackReports);
        setStatusMessage(
          'API modération indisponible. Affichage des signalements locaux.',
        );
      })
      .finally(() => setIsLoading(false));
  }, [isAdmin]);

  const filteredReports = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesStatus =
        filters.status === 'all' || report.status === filters.status;
      const matchesTargetType =
        filters.targetType === 'all' ||
        report.targetType === filters.targetType;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          report.targetLabel,
          report.reason,
          report.description,
          report.reporterEmail,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesTargetType && matchesQuery;
    });
  }, [filters, reports]);

  const updateFilter = <Key extends keyof Filters>(
    key: Key,
    value: Filters[Key],
  ) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const applyAction = async (
    report: ModerationReport,
    action: ModerationAction,
  ) => {
    setStatusMessage('');

    try {
      if (action === 'dismiss') {
        await dismissModerationReport(report.id);
      }

      if (action === 'warn') {
        await warnModerationTarget(report.id);
      }

      if (action === 'suspend') {
        await suspendModerationTarget(report.id);
      }

      const nextStatus = getNextStatus(action);
      setReports((currentReports) =>
        currentReports.map((currentReport) =>
          currentReport.id === report.id
            ? { ...currentReport, status: nextStatus }
            : currentReport,
        ),
      );
      setStatusMessage(
        `${actionLabels[action]} appliqué sur ${report.targetLabel}.`,
      );
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "L'action de modération a échoué.",
      );
    }
  };

  if (!isAdmin) {
    return (
      <Page className="container">
        <ForbiddenCard>
          <h2>Accès interdit</h2>
          <p>Cette page est réservée aux administrateurs Chayé.</p>
        </ForbiddenCard>
      </Page>
    );
  }

  return (
    <Page className="container">
      <Header>
        <div>
          <h2 className="txtLeft">Modération</h2>
          <p>Signalements utilisateurs, inscriptions et annonces à vérifier.</p>
        </div>
        <Counter>{filteredReports.length} signalement(s)</Counter>
      </Header>

      <FiltersBar aria-label="Filtres de signalements">
        <label>
          Statut
          <select
            value={filters.status}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              updateFilter('status', event.target.value as Filters['status'])
            }
          >
            <option value="all">Tous</option>
            <option value="open">Ouverts</option>
            <option value="dismissed">Classés</option>
            <option value="warned">Avertis</option>
            <option value="suspended">Suspendus</option>
          </select>
        </label>

        <label>
          Cible
          <select
            value={filters.targetType}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              updateFilter(
                'targetType',
                event.target.value as Filters['targetType'],
              )
            }
          >
            <option value="all">Toutes</option>
            <option value="announcement">Annonces</option>
            <option value="member">Profils</option>
            <option value="registration">Inscriptions</option>
          </select>
        </label>

        <label>
          Recherche
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter('query', event.target.value)}
            placeholder="Motif, email, cible..."
          />
        </label>
      </FiltersBar>

      {statusMessage && (
        <StatusMessage role="status">{statusMessage}</StatusMessage>
      )}

      {isLoading ? (
        <EmptyState>Chargement des signalements...</EmptyState>
      ) : (
        <ReportsList>
          {filteredReports.map((report) => (
            <ReportCard key={report.id}>
              <ReportMeta>
                <Badge>{targetLabels[report.targetType]}</Badge>
                <StatusBadge $status={report.status}>
                  {statusLabels[report.status]}
                </StatusBadge>
                <time dateTime={report.createdAt}>
                  {new Intl.DateTimeFormat('fr-FR', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(report.createdAt))}
                </time>
              </ReportMeta>

              <h3>{report.targetLabel}</h3>
              <p>
                <strong>{report.reason}</strong>
              </p>
              {report.description && <p>{report.description}</p>}
              {report.reporterEmail && (
                <Reporter>{report.reporterEmail}</Reporter>
              )}

              <Actions>
                <ActionButton
                  type="button"
                  onClick={() => applyAction(report, 'dismiss')}
                  disabled={report.status !== 'open'}
                >
                  Classer sans suite
                </ActionButton>
                <ActionButton
                  type="button"
                  onClick={() => applyAction(report, 'warn')}
                  disabled={report.status !== 'open'}
                >
                  Avertir
                </ActionButton>
                <DangerButton
                  type="button"
                  onClick={() => applyAction(report, 'suspend')}
                  disabled={report.status !== 'open'}
                >
                  Suspendre
                </DangerButton>
              </Actions>
            </ReportCard>
          ))}
        </ReportsList>
      )}

      {!isLoading && filteredReports.length === 0 && (
        <EmptyState>Aucun signalement ne correspond aux filtres.</EmptyState>
      )}
    </Page>
  );
};

const getNextStatus = (action: ModerationAction): ModerationReportStatus => {
  if (action === 'dismiss') {
    return 'dismissed';
  }

  if (action === 'warn') {
    return 'warned';
  }

  return 'suspended';
};

const Page = styled.main`
  padding-bottom: 48px;
`;

const Header = styled.header`
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-top: 36px;
  text-align: left;

  h2 {
    margin: 0;
  }

  p {
    color: #383838;
    font-size: 15px;
    margin: 8px 0 0;
  }
`;

const Counter = styled.span`
  background: #4f4294;
  border-radius: 50px;
  color: #fff;
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: 800;
  padding: 10px 18px;
`;

const FiltersBar = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-top: 24px;
  padding: 18px;

  label {
    color: #383838;
    display: grid;
    font-size: 13px;
    font-weight: 800;
    gap: 8px;
  }

  input,
  select {
    border: 1px solid #cacaca;
    border-radius: 6px;
    font: inherit;
    min-height: 42px;
    padding: 9px 12px;
  }
`;

const ReportsList = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 20px;
`;

const ReportCard = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 20px;

  h3 {
    color: #1f1f1f;
    font-size: 20px;
    margin: 14px 0 8px;
  }

  p {
    color: #383838;
    line-height: 1.5;
    margin: 6px 0;
  }
`;

const ReportMeta = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  time {
    color: #6b6b6b;
    font-size: 13px;
  }
`;

const Badge = styled.span`
  background: #f4f1ff;
  border-radius: 50px;
  color: #4f4294;
  font-size: 12px;
  font-weight: 800;
  padding: 6px 10px;
`;

const StatusBadge = styled.span<{ $status: ModerationReportStatus }>`
  background: ${({ $status }) => ($status === 'open' ? '#fff1ef' : '#edf8f1')};
  border-radius: 50px;
  color: ${({ $status }) => ($status === 'open' ? '#9d1c12' : '#0b6b3a')};
  font-size: 12px;
  font-weight: 800;
  padding: 6px 10px;
`;

const Reporter = styled.p`
  color: #6b6b6b !important;
  font-size: 13px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`;

const ActionButton = styled.button`
  background: #4f4294;
  border: 0;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  font-weight: 800;
  padding: 10px 16px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

const DangerButton = styled(ActionButton)`
  background: #ec634e;
`;

const StatusMessage = styled.p`
  background: #edf8f1;
  border-radius: 8px;
  color: #0b6b3a;
  font-size: 14px;
  margin: 18px 0 0;
  padding: 12px 14px;
`;

const EmptyState = styled.p`
  background: #fff;
  border-radius: 8px;
  color: #383838;
  margin-top: 20px;
  padding: 20px;
`;

const ForbiddenCard = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  margin-top: 36px;
  max-width: 560px;
  padding: 28px;

  h2 {
    margin: 0 0 10px;
    text-align: left;
  }

  p {
    color: #383838;
    margin: 0;
  }
`;

export default AdminModeration;
