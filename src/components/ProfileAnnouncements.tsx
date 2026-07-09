import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Announcement,
  MemberProfile,
  getAnnouncements,
  getCurrentMember,
} from './API/apiManager';

const ProfileAnnouncements = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Promise.all([getCurrentMember(), getAnnouncements()])
      .then(([member, nextAnnouncements]) => {
        setProfile(member);
        setAnnouncements(nextAnnouncements);
      })
      .catch((error) => {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Impossible de charger vos annonces.',
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const myAnnouncements = useMemo(() => {
    if (!profile) {
      return [];
    }

    return announcements.filter(
      (announcement) => announcement.memberId === profile.id,
    );
  }, [announcements, profile]);

  if (!isLoading && !profile) {
    return (
      <Page className="container">
        <Panel>
          <PanelHeader>
            <h1>Mes annonces</h1>
            <button type="button" onClick={() => navigate('/profil')}>
              Retour
            </button>
          </PanelHeader>
          <Feedback>
            {errorMessage || 'Connectez-vous pour voir vos annonces.'}
          </Feedback>
          <PrimaryLink to="/login">Se connecter</PrimaryLink>
        </Panel>
      </Page>
    );
  }

  return (
    <Page className="container">
      <Panel>
        <PanelHeader>
          <div>
            <h1>Mes annonces</h1>
            <p>
              {profile
                ? `${profile.firstname} ${profile.lastname}`
                : 'Chargement du profil...'}
            </p>
          </div>
          <button type="button" onClick={() => navigate('/profil')}>
            Retour
          </button>
        </PanelHeader>

        {isLoading ? <Feedback>Chargement des annonces...</Feedback> : null}
        {errorMessage ? <Feedback>{errorMessage}</Feedback> : null}
        {!isLoading && myAnnouncements.length === 0 ? (
          <EmptyState>
            <strong>Aucune annonce publiée.</strong>
            <span>Les annonces visibles de votre compte apparaîtront ici.</span>
            <Actions>
              <PrimaryLink to="/sender">Publier une expédition</PrimaryLink>
              <SecondaryLink to="/carrier">Publier un trajet</SecondaryLink>
            </Actions>
          </EmptyState>
        ) : null}

        <CardsGrid>
          {myAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id}>
              <CardHeader>
                <TypeBadge>
                  {formatAnnouncementType(announcement.type)}
                </TypeBadge>
                <StatusBadge>{announcement.status}</StatusBadge>
              </CardHeader>
              <RouteGrid>
                <RouteItem>
                  <span>Départ</span>
                  <strong>{announcement.departingFrom}</strong>
                </RouteItem>
                <RouteItem>
                  <span>Destination</span>
                  <strong>{announcement.arrivingAt}</strong>
                </RouteItem>
              </RouteGrid>
              <Description>{announcement.description}</Description>
              <DetailsGrid>
                <Detail>
                  <span>Poids</span>
                  <strong>
                    {formatWeight(announcement.weightAvailability)}
                  </strong>
                </Detail>
                <Detail>
                  <span>Prix</span>
                  <strong>{formatPrice(announcement.price)}</strong>
                </Detail>
              </DetailsGrid>
            </AnnouncementCard>
          ))}
        </CardsGrid>
      </Panel>
    </Page>
  );
};

const formatAnnouncementType = (type: string) =>
  type === 'transport' ? 'Transporteur' : 'Expéditeur';

const formatWeight = (weight: number) =>
  `${new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 1,
  }).format(weight)} kg`;

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(price)} €`;

const Page = styled.main`
  background: #f4f3fa;
  min-height: calc(100vh - 90px);
  padding: 48px 0 72px;
`;

const Panel = styled.section`
  background: #56469f;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(41, 34, 83, 0.22);
  margin: 0 auto;
  max-width: 900px;
  padding: 28px;
`;

const PanelHeader = styled.header`
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
  padding-bottom: 22px;

  h1 {
    font-size: 28px;
    margin: 0;
  }

  p {
    color: rgba(255, 255, 255, 0.78);
    margin: 6px 0 0;
  }

  button {
    background: #fff;
    border: 0;
    border-radius: 8px;
    color: #56469f;
    cursor: pointer;
    font-weight: 800;
    padding: 10px 16px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 18px;
`;

const AnnouncementCard = styled.article`
  background: #f7f5fb;
  border: 1px solid transparent;
  border-radius: 8px;
  display: grid;
  gap: 18px;
  padding: 22px 26px;
`;

const CardHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const TypeBadge = styled.span`
  background: #ef604f;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  padding: 7px 10px;
`;

const StatusBadge = styled.span`
  color: #56469f;
  font-weight: 800;
  text-transform: capitalize;
`;

const RouteGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const RouteItem = styled.div`
  display: grid;
  gap: 4px;

  span {
    color: #6c6876;
    font-size: 13px;
  }

  strong {
    color: #222;
  }
`;

const Description = styled.p`
  color: #4d4a56;
  margin: 0;
`;

const DetailsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;

const Detail = styled.div`
  display: grid;
  gap: 3px;

  span {
    color: #6c6876;
    font-size: 13px;
  }

  strong {
    color: #56469f;
  }
`;

const Feedback = styled.p`
  background: #f7f5fb;
  border-radius: 8px;
  color: #25232b;
  margin: 0 0 18px;
  padding: 14px 16px;
`;

const EmptyState = styled.div`
  background: #f7f5fb;
  border-radius: 8px;
  color: #25232b;
  display: grid;
  gap: 12px;
  padding: 24px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PrimaryLink = styled(Link)`
  background: #ef604f;
  border-radius: 8px;
  color: #fff;
  font-weight: 800;
  padding: 10px 16px;
  text-decoration: none;
`;

const SecondaryLink = styled(Link)`
  background: #eee9ff;
  border-radius: 8px;
  color: #56469f;
  font-weight: 800;
  padding: 10px 16px;
  text-decoration: none;
`;

export default ProfileAnnouncements;
