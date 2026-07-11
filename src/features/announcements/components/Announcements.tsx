import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAccountRestrictions } from '../../members/components/AccountStatusNotice';
import { Announcement, getAnnouncements } from '../api/announcements.api';
import { getStoredMember } from '../../auth/api/auth.api';
import { findOrCreateDiscussion } from '../../messages/api/messages.api';
import { flightDestinationCatalog } from '../../../assets/flightDestinationsAfriqueAntilles';
import fallbackAirportImage from '../../../assets/generique_airport.png';

type AnnouncementFilters = {
  departure: string;
  destination: string;
  maxPrice: string;
  minWeight: string;
  search: string;
};

const emptyFilters: AnnouncementFilters = {
  departure: '',
  destination: '',
  maxPrice: '',
  minWeight: '',
  search: '',
};

type AnnouncementTypeFilter = 'shipping' | 'transport';

const announcementTypeTabs: Array<{
  label: string;
  type: AnnouncementTypeFilter;
}> = [
  { label: 'Expéditeur', type: 'shipping' },
  { label: 'Transporteur', type: 'transport' },
];

type AirportOption = {
  city: string;
  country: string;
  flagImageAlt: string;
  flagImageUrl: string;
  iata: string;
  imageAlt: string;
  imageUrl: string;
  name: string;
};

const airportOptions: AirportOption[] = [
  ...flightDestinationCatalog.popularEuropeanGatewayAirports.flatMap(
    (gateway) =>
      gateway.airports.map((airport) => ({
        ...airport,
        country: gateway.country,
        flagImageAlt: gateway.flagImageAlt,
        flagImageUrl: gateway.flagImageUrl,
        imageAlt: gateway.imageAlt,
        imageUrl: gateway.imageUrl,
      })),
  ),
  ...[
    ...flightDestinationCatalog.destinations.africa,
    ...flightDestinationCatalog.destinations.antilles,
  ].flatMap((destination) =>
    destination.airports.map((airport) => ({
      ...airport,
      country: destination.name,
      flagImageAlt: destination.flagImageAlt,
      flagImageUrl: destination.flagImageUrl,
      imageAlt: destination.imageAlt,
      imageUrl: destination.imageUrl,
    })),
  ),
];

const Announces = () => {
  const navigate = useNavigate();
  const { isRestricted } = useAccountRestrictions();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filters, setFilters] = useState<AnnouncementFilters>(emptyFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [openingAnnouncementId, setOpeningAnnouncementId] = useState<
    number | null
  >(null);
  const [actionMessage, setActionMessage] = useState('');
  const [selectedType, setSelectedType] =
    useState<AnnouncementTypeFilter>('shipping');
  const currentMember = useMemo(() => getStoredMember(), []);

  useEffect(() => {
    getAnnouncements()
      .then(setAnnouncements)
      .catch((error) =>
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Impossible de charger les annonces.',
        ),
      )
      .finally(() => setIsLoading(false));
  }, []);

  const filteredAnnouncements = useMemo(
    () =>
      announcements.filter((announcement) => {
        const maxPrice = parseLocaleNumber(filters.maxPrice);
        const minWeight = parseLocaleNumber(filters.minWeight);
        const departureAirport = getSelectedAirport(filters.departure);
        const destinationAirport = getSelectedAirport(filters.destination);
        const search = normalizeValue(filters.search);
        const matchesType = announcement.type === selectedType;

        const matchesDeparture =
          !filters.departure ||
          matchesAirportFilter(announcement.departingFrom, filters.departure) ||
          Boolean(
            departureAirport &&
              matchesAirportFilter(
                announcement.departingFrom,
                departureAirport.city,
              ),
          );
        const matchesDestination =
          !filters.destination ||
          matchesAirportFilter(announcement.arrivingAt, filters.destination) ||
          Boolean(
            destinationAirport &&
              matchesAirportFilter(
                announcement.arrivingAt,
                destinationAirport.city,
              ),
          );
        const matchesWeight =
          minWeight === null || announcement.weightAvailability >= minWeight;
        const matchesPrice =
          maxPrice === null || announcement.price <= maxPrice;
        const matchesSearch =
          !search ||
          [
            announcement.description,
            announcement.departingFrom,
            announcement.arrivingAt,
            announcement.type,
          ]
            .map(normalizeValue)
            .some((value) => value.includes(search));

        return (
          matchesType &&
          matchesDeparture &&
          matchesDestination &&
          matchesWeight &&
          matchesPrice &&
          matchesSearch
        );
      }),
    [announcements, filters, selectedType],
  );

  const typeCounts = useMemo(
    () =>
      announcementTypeTabs.reduce(
        (counts, tab) => ({
          ...counts,
          [tab.type]: announcements.filter(
            (announcement) => announcement.type === tab.type,
          ).length,
        }),
        {} as Record<AnnouncementTypeFilter, number>,
      ),
    [announcements],
  );

  const handleFilterChange =
    (name: keyof AnnouncementFilters) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        [name]: event.target.value,
      }));
    };

  const handleOpenDiscussion = async (announcement: Announcement) => {
    if (isRestricted) {
      return;
    }

    if (!currentMember) {
      navigate('/login');
      return;
    }

    if (announcement.memberId === currentMember.id) {
      setActionMessage(
        'Vous êtes l’éditeur de cette annonce. La discussion doit être ouverte par un autre membre.',
      );
      return;
    }

    setOpeningAnnouncementId(announcement.id);
    setActionMessage('');

    try {
      const discussion = await findOrCreateDiscussion(announcement.memberId);
      navigate(`/profil/messages/${discussion.id}`);
    } catch (error) {
      setActionMessage(
        error instanceof Error
          ? error.message
          : 'Impossible d’ouvrir la discussion.',
      );
    } finally {
      setOpeningAnnouncementId(null);
    }
  };

  return (
    <Page className="container">
      <HeroBanner aria-label="Chaye annonces" />

      <ActionPanel>
        <h2>Que veux tu faire ?</h2>
        <ActionButtons>
          <ActionLink to="/sender">J’expédie</ActionLink>
          <ActionLink to="/carrier">Je transporte</ActionLink>
        </ActionButtons>
      </ActionPanel>

      <SearchBar aria-label="Recherche globale">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Rechercher"
          value={filters.search}
          onChange={handleFilterChange('search')}
        />
      </SearchBar>

      <InsuranceSection>
        <h2>Assurance</h2>
        <InsuranceCard>
          <InsuranceText>
            <p>
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin.
            </p>
            <a href="#assurance">Lire la suite</a>
          </InsuranceText>
          <img src="images/logochayeassurance.png" alt="Chaye assurance" />
        </InsuranceCard>
      </InsuranceSection>

      <HeaderRow>
        <h2>Toutes les annonces</h2>
        <button type="button">Favori</button>
      </HeaderRow>

      <FiltersPanel aria-label="Filtres des annonces">
        <FilterField>
          <span>Départ</span>
          <input
            list="departure-airports"
            type="text"
            placeholder="Nom de l’aéroport"
            value={filters.departure}
            onChange={handleFilterChange('departure')}
          />
        </FilterField>
        <FilterField>
          <span>Destination</span>
          <input
            list="destination-airports"
            type="text"
            placeholder="Nom de l’aéroport"
            value={filters.destination}
            onChange={handleFilterChange('destination')}
          />
        </FilterField>
        <FilterField>
          <span>Poids min.</span>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="3.5 kg"
            value={filters.minWeight}
            onChange={handleFilterChange('minWeight')}
          />
        </FilterField>
        <FilterField>
          <span>Prix max.</span>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="60 €"
            value={filters.maxPrice}
            onChange={handleFilterChange('maxPrice')}
          />
        </FilterField>
        <ResetFilters type="button" onClick={() => setFilters(emptyFilters)}>
          Réinitialiser
        </ResetFilters>
      </FiltersPanel>
      <datalist id="departure-airports">
        {airportOptions.map((airport) => (
          <option
            key={`departure-${airport.iata}-${airport.name}`}
            value={airport.name}
          >
            {airport.city}, {airport.country}
          </option>
        ))}
      </datalist>
      <datalist id="destination-airports">
        {airportOptions.map((airport) => (
          <option
            key={`destination-${airport.iata}-${airport.name}`}
            value={airport.name}
          >
            {airport.city}, {airport.country}
          </option>
        ))}
      </datalist>

      <TypeTabs aria-label="Types d'annonces">
        {announcementTypeTabs.map((tab) => (
          <TypeTabButton
            key={tab.type}
            type="button"
            $active={selectedType === tab.type}
            onClick={() => setSelectedType(tab.type)}
          >
            <span>{tab.label}</span>
            <small>{typeCounts[tab.type] ?? 0}</small>
          </TypeTabButton>
        ))}
      </TypeTabs>

      {errorMessage ? <Feedback $tone="error">{errorMessage}</Feedback> : null}
      {actionMessage ? <Feedback $tone="info">{actionMessage}</Feedback> : null}
      {isLoading ? (
        <Feedback $tone="info">Chargement des annonces...</Feedback>
      ) : null}
      {!isLoading && announcements.length === 0 ? (
        <Feedback $tone="info">
          Aucune annonce visible pour le moment. Côté API, seules les annonces
          publiées remontent dans cette liste.
        </Feedback>
      ) : null}
      {!isLoading &&
      announcements.length > 0 &&
      filteredAnnouncements.length === 0 ? (
        <Feedback $tone="info">
          Aucune annonce ne correspond à ces filtres.
        </Feedback>
      ) : null}

      <ResultsMeta>
        {filteredAnnouncements.length} annonce(s) affichée(s)
      </ResultsMeta>

      <CardsGrid>
        {filteredAnnouncements.map((announcement) => {
          const departureAirport = resolveAirport(announcement.departingFrom);
          const destinationAirport = resolveAirport(announcement.arrivingAt);
          const cardImage =
            destinationAirport?.imageUrl ?? fallbackAirportImage;

          return (
            <AnnouncementCard key={announcement.id}>
              <ImageWrap>
                <img
                  src={cardImage}
                  onError={(event) => {
                    if (!event.currentTarget.dataset.fallbackApplied) {
                      event.currentTarget.dataset.fallbackApplied = 'true';
                      event.currentTarget.src = fallbackAirportImage;
                    }
                  }}
                  alt={
                    destinationAirport?.imageAlt ??
                    `${announcement.departingFrom} vers ${announcement.arrivingAt}`
                  }
                />
                {destinationAirport ? (
                  <FlagImage
                    src={destinationAirport.flagImageUrl}
                    alt={destinationAirport.flagImageAlt}
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <FavoriteButton type="button" aria-label="Ajouter aux favoris">
                  ♥
                </FavoriteButton>
              </ImageWrap>
              <CardBody>
                <RouteLine>
                  <span>Départ</span>
                  <AirportInfo>
                    <strong>
                      {departureAirport?.name ?? announcement.departingFrom}
                    </strong>
                    <small>
                      {formatAirportLocation(
                        departureAirport,
                        announcement.departingFrom,
                      )}
                    </small>
                  </AirportInfo>
                </RouteLine>
                <RouteLine>
                  <span>Destination</span>
                  <AirportInfo>
                    <strong>
                      {destinationAirport?.name ?? announcement.arrivingAt}
                    </strong>
                    <small>
                      {formatAirportLocation(
                        destinationAirport,
                        announcement.arrivingAt,
                      )}
                    </small>
                  </AirportInfo>
                </RouteLine>
                <Line>
                  <span>Poids disponible</span>
                  <strong>
                    {formatWeight(announcement.weightAvailability)}
                  </strong>
                </Line>
                <Line>
                  <span>Prix</span>
                  <strong>{formatPrice(announcement.price)}</strong>
                </Line>
                <Description>{announcement.description}</Description>
                <CardActions>
                  <ReserveButton type="button" disabled={isRestricted}>
                    Réserver
                  </ReserveButton>
                  <MessageButton
                    type="button"
                    disabled={isRestricted || openingAnnouncementId !== null}
                    onClick={() => handleOpenDiscussion(announcement)}
                  >
                    {openingAnnouncementId === announcement.id
                      ? 'Ouverture...'
                      : 'Message'}
                  </MessageButton>
                </CardActions>
              </CardBody>
            </AnnouncementCard>
          );
        })}
      </CardsGrid>
    </Page>
  );
};

const normalizeValue = (value: string | number) =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const getSelectedAirport = (value: string) =>
  airportOptions.find(
    (airport) =>
      normalizeValue(airport.name) === normalizeValue(value) ||
      normalizeValue(airport.city) === normalizeValue(value),
  );

const matchesAirportFilter = (announcementValue: string, filterValue: string) =>
  normalizeValue(announcementValue).includes(normalizeValue(filterValue));

const resolveAirport = (value: string) => {
  const normalizedValue = normalizeValue(value);

  return airportOptions.find(
    (airport) =>
      normalizeValue(airport.name) === normalizedValue ||
      normalizeValue(airport.city) === normalizedValue ||
      normalizeValue(airport.country) === normalizedValue ||
      normalizedValue.includes(normalizeValue(airport.name)) ||
      normalizedValue.includes(normalizeValue(airport.city)) ||
      normalizedValue.includes(normalizeValue(airport.country)),
  );
};

const formatAirportLocation = (
  airport: AirportOption | undefined,
  fallback: string,
) => {
  if (!airport) {
    return fallback;
  }

  return `${airport.city}, ${airport.country}`;
};

const parseLocaleNumber = (value: string) => {
  if (!value.trim()) {
    return null;
  }

  const parsedValue = Number(value.replace(',', '.'));
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const formatWeight = (weight: number) =>
  `${new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 1,
  }).format(weight)}KG`;

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(price)}€`;

const Page = styled.main`
  background: #f4f3fa;
  min-height: calc(100vh - 90px);
  padding-bottom: 72px;
  padding-top: 58px;
`;

const HeroBanner = styled.section`
  background: #ef604f;
  border-radius: 8px;
  height: 270px;
  margin: 0 auto 30px;
  max-width: 860px;
`;

const ActionPanel = styled.section`
  background: #fff;
  border-radius: 8px;
  display: grid;
  gap: 28px;
  margin: 0 auto 28px;
  max-width: 860px;
  padding: 28px 24px;
  text-align: center;

  h2 {
    color: #1f1f1f;
    font-size: 22px;
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 64px;
  justify-content: center;
`;

const ActionLink = styled(Link)`
  background: #ef604f;
  border-radius: 12px;
  color: #fff;
  font-weight: 800;
  min-width: 134px;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
`;

const SearchBar = styled.label`
  align-items: center;
  background: #fff;
  border-radius: 8px;
  color: #9aa8bd;
  display: flex;
  gap: 12px;
  margin: 0 auto 28px;
  max-width: 860px;
  padding: 14px 26px;

  input {
    border: 0;
    color: #333;
    flex: 1;
    font-size: 15px;
    outline: 0;
  }

  input::placeholder {
    color: #c8d0df;
  }
`;

const InsuranceSection = styled.section`
  margin: 0 auto 28px;
  max-width: 860px;

  h2 {
    color: #252525;
    font-size: 22px;
    margin: 0 0 24px;
  }
`;

const InsuranceCard = styled.article`
  align-items: center;
  background: #fff;
  border-radius: 8px;
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 1fr) 150px;
  padding: 32px 56px;

  img {
    justify-self: center;
    max-width: 120px;
    width: 100%;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    padding: 28px;
  }
`;

const InsuranceText = styled.div`
  color: #353535;

  p {
    line-height: 1.6;
    margin: 0 0 10px;
  }

  a {
    color: #1f1f1f;
    font-weight: 800;
    text-decoration: none;
  }
`;

const HeaderRow = styled.div`
  align-items: end;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 58px;
  max-width: 860px;

  h2 {
    color: #252525;
    font-size: 22px;
    margin: 0;
  }

  button {
    background: transparent;
    border: 0;
    border-bottom: 2px solid #56469f;
    color: #ef604f;
    cursor: pointer;
    font-weight: 800;
    padding: 0 0 8px;
  }
`;

const FiltersPanel = styled.form`
  align-items: end;
  background: #d8d8d8;
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  margin: -34px auto 54px;
  max-width: 820px;
  padding: 18px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const FilterField = styled.label`
  display: grid;
  gap: 6px;

  span {
    color: #3f3f3f;
    font-size: 12px;
    font-weight: 800;
  }

  input {
    border: 0;
    border-radius: 6px;
    min-width: 0;
    padding: 11px 12px;
  }
`;

const ResetFilters = styled.button`
  background: #56469f;
  border: 0;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-weight: 800;
  padding: 11px 14px;
`;

const TypeTabs = styled.div`
  display: flex;
  gap: 12px;
  margin: -28px auto 32px;
  max-width: 820px;

  @media (max-width: 560px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const TypeTabButton = styled.button<{ $active: boolean }>`
  align-items: center;
  background: ${({ $active }) => ($active ? '#56469f' : '#fff')};
  border: 1px solid ${({ $active }) => ($active ? '#56469f' : '#e5e2ef')};
  border-radius: 8px;
  color: ${({ $active }) => ($active ? '#fff' : '#2c2c2c')};
  cursor: pointer;
  display: inline-flex;
  gap: 10px;
  justify-content: center;
  min-height: 42px;
  min-width: 154px;
  padding: 10px 16px;

  span {
    font-weight: 800;
  }

  small {
    align-items: center;
    background: ${({ $active }) => ($active ? '#fff' : '#ef604f')};
    border-radius: 999px;
    color: ${({ $active }) => ($active ? '#56469f' : '#fff')};
    display: inline-flex;
    font-size: 12px;
    font-weight: 800;
    height: 22px;
    justify-content: center;
    min-width: 28px;
    padding: 0 7px;
  }
`;

const ResultsMeta = styled.p`
  color: #6b6b6b;
  font-size: 13px;
  margin: 0 auto 22px;
  max-width: 820px;
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 26px 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0 auto;
  max-width: 820px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

const AnnouncementCard = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(35, 35, 35, 0.08);
  overflow: hidden;
`;

const ImageWrap = styled.div`
  aspect-ratio: 1.75;
  overflow: hidden;
  position: relative;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const FavoriteButton = styled.button`
  align-items: center;
  background: #fff;
  border: 0;
  border-radius: 50%;
  bottom: 8px;
  box-shadow: 0 4px 10px rgba(35, 35, 35, 0.2);
  color: #ef604f;
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  height: 28px;
  justify-content: center;
  position: absolute;
  right: 8px;
  width: 28px;
`;

const FlagImage = styled.img`
  border: 2px solid #fff;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(35, 35, 35, 0.22);
  height: 28px !important;
  left: 8px;
  object-fit: cover;
  position: absolute;
  top: 8px;
  width: 42px !important;
`;

const CardBody = styled.div`
  display: grid;
  gap: 6px;
  padding: 10px 12px 12px;
`;

const Line = styled.div`
  align-items: baseline;
  display: grid;
  gap: 6px;
  grid-template-columns: minmax(0, 1fr) auto;

  span {
    color: #333;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span::after {
    color: #a3a3a3;
    content: '................';
    padding-left: 2px;
  }

  strong {
    color: #56469f;
    font-size: 12px;
  }
`;

const RouteLine = styled.div`
  display: grid;
  gap: 4px;

  > span {
    color: #333;
    font-size: 12px;
    font-weight: 800;
  }
`;

const AirportInfo = styled.div`
  display: grid;
  gap: 2px;

  strong {
    color: #56469f;
    font-size: 12px;
    line-height: 1.2;
  }

  small {
    color: #8a8a8a;
    font-size: 11px;
    line-height: 1.2;
  }
`;

const Description = styled.p`
  color: #626262;
  display: -webkit-box;
  font-size: 12px;
  line-height: 1.35;
  margin: 4px 0 0;
  min-height: 32px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const CardActions = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`;

const CardActionButton = styled.button`
  background: #ef604f;
  border: 0;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  padding: 8px 10px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const ReserveButton = styled(CardActionButton)`
  background: #56469f;
`;

const MessageButton = styled(CardActionButton)``;

const Feedback = styled.p<{ $tone: 'error' | 'info' }>`
  background: ${({ $tone }) => ($tone === 'error' ? '#fff1ef' : '#f3f0ff')};
  border-left: 4px solid
    ${({ $tone }) => ($tone === 'error' ? '#ec634e' : '#4f4294')};
  border-radius: 8px;
  color: #232323;
  margin: 0 auto 16px;
  max-width: 820px;
  padding: 12px 14px;
`;

export default Announces;
