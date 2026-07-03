import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import BrandFooter from '../../../components/BrandFooter';
import BrandHeader from '../../../components/BrandHeader';
import apiClient from '../../../lib/api-client';
import { formatFrenchDate } from '../../../lib/date-format';
import type { Announcement } from '../announcement.types';
import './AnnouncementsPage.css';

type SearchFilters = {
  departure: string;
  destination: string;
  weight: string;
};

const emptyFilters: SearchFilters = {
  departure: '',
  destination: '',
  weight: '',
};

const overseasDestinations =
  /martinique|fort-de-france|guadeloupe|pointe-à-pitre|pointe-a-pitre|guyane|cayenne|réunion|reunion|mayotte|mamoudzou/i;
const africaDestinations =
  /sénégal|senegal|dakar|mali|bamako|côte d'ivoire|cote d'ivoire|abidjan|cameroun|douala|yaoundé|yaounde|guinée|guinee|conakry/i;

function normalizedValue(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLocaleLowerCase('fr');
}

function getCorridor(announcement: Announcement) {
  const route = `${announcement.departingFrom ?? ''} ${
    announcement.arrivingAt ?? announcement.arriving_at ?? ''
  }`;

  if (overseasDestinations.test(route)) return 'Corridor outre-mer';
  if (africaDestinations.test(route)) return 'Corridor Afrique';
  return 'Trajet international';
}

function formatPrice(value: Announcement['price']) {
  const price = Number(value);
  return Number.isFinite(price)
    ? `${price.toLocaleString('fr-FR')} €`
    : 'À convenir';
}

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    apiClient
      .get<Announcement[]>('/announcements')
      .then((response) => {
        setAnnouncements(response.data);
        setError('');
      })
      .catch(() => {
        setError('Impossible de charger les trajets pour le moment.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredAnnouncements = useMemo(() => {
    const minimumWeight = Number(filters.weight);

    return announcements.filter((announcement) => {
      const departure = normalizedValue(announcement.departingFrom);
      const destination = normalizedValue(
        announcement.arrivingAt ?? announcement.arriving_at
      );
      const availableWeight = Number(
        announcement.weightAvailability ?? announcement.weight_availability
      );

      return (
        departure.includes(normalizedValue(filters.departure)) &&
        destination.includes(normalizedValue(filters.destination)) &&
        (!filters.weight ||
          (Number.isFinite(availableWeight) &&
            availableWeight >= minimumWeight))
      );
    });
  }, [announcements, filters]);

  const hasFilters = Object.values(filters).some(Boolean);
  const visibleAnnouncements = filteredAnnouncements.slice(0, visibleCount);
  const hasMoreResults = visibleCount < filteredAnnouncements.length;

  function updateFilter(field: keyof SearchFilters, value: string) {
    setFilters((current) => ({ ...current, [field]: value }));
    setVisibleCount(8);
  }

  function resetFilters() {
    setFilters(emptyFilters);
    setVisibleCount(8);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById('trip-results')?.focus();
  }

  return (
    <div className="trip-market">
      <BrandHeader
        actionLabel="Proposer un trajet"
        actionTo="/announcements/new"
        links={[
          { label: 'Accueil', to: '/' },
          { label: 'Comment ça marche', to: '/#fonctionnement' },
          { label: 'Support', to: '/support' },
        ]}
      />

      <main>
        <section className="trip-market__intro" aria-labelledby="trips-title">
          <div>
            <p className="trip-market__eyebrow">Trajets disponibles</p>
            <h1 id="trips-title">
              Trouvez la place qui fera voyager votre colis.
            </h1>
          </div>
          <p>
            Comparez les itinéraires, la capacité disponible et le tarif avant
            de choisir un voyageur.
          </p>
        </section>

        <section className="trip-search" aria-label="Rechercher un trajet">
          <form onSubmit={handleSearch}>
            <label>
              <span>Départ</span>
              <div>
                <i className="bx bx-map" aria-hidden="true"></i>
                <input
                  type="search"
                  value={filters.departure}
                  onChange={(event) =>
                    updateFilter('departure', event.target.value)
                  }
                  placeholder="Paris, Bordeaux…"
                />
              </div>
            </label>

            <label>
              <span>Destination</span>
              <div>
                <i className="bx bx-map-pin" aria-hidden="true"></i>
                <input
                  type="search"
                  value={filters.destination}
                  onChange={(event) =>
                    updateFilter('destination', event.target.value)
                  }
                  placeholder="Dakar, Fort-de-France…"
                />
              </div>
            </label>

            <label>
              <span>Poids minimum</span>
              <div>
                <i className="bx bx-package" aria-hidden="true"></i>
                <input
                  min="1"
                  type="number"
                  value={filters.weight}
                  onChange={(event) =>
                    updateFilter('weight', event.target.value)
                  }
                  placeholder="5 kg"
                />
              </div>
            </label>

            <button type="submit">
              Rechercher
              <i className="bx bx-search" aria-hidden="true"></i>
            </button>
          </form>
        </section>

        <section
          className="trip-results"
          id="trip-results"
          aria-labelledby="results-title"
          tabIndex={-1}
        >
          <div className="trip-results__heading">
            <div>
              <p className="trip-market__eyebrow">Résultats</p>
              <h2 id="results-title">Les prochains départs</h2>
            </div>
            {!loading && !error && (
              <p aria-live="polite">
                {filteredAnnouncements.length}{' '}
                {filteredAnnouncements.length > 1
                  ? 'trajets trouvés'
                  : 'trajet trouvé'}
              </p>
            )}
          </div>

          {loading ? (
            <div className="trip-results__status" role="status">
              <span className="trip-results__loader" aria-hidden="true"></span>
              Recherche des prochains trajets…
            </div>
          ) : error ? (
            <div className="trip-results__empty" role="alert">
              <i className="bx bx-wifi-off" aria-hidden="true"></i>
              <h3>Les trajets sont momentanément indisponibles.</h3>
              <p>{error}</p>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="trip-results__empty">
              <i className="bx bx-map-alt" aria-hidden="true"></i>
              <h3>
                {hasFilters
                  ? 'Aucun trajet ne correspond à cette recherche.'
                  : 'Les premiers trajets arrivent bientôt.'}
              </h3>
              <p>
                {hasFilters
                  ? 'Essayez une autre destination, une date plus souple ou un poids inférieur.'
                  : 'Publiez votre trajet pour devenir l’un des premiers voyageurs de la communauté.'}
              </p>
              {hasFilters ? (
                <button type="button" onClick={resetFilters}>
                  Réinitialiser la recherche
                </button>
              ) : (
                <Link to="/announcements/new">Proposer un trajet</Link>
              )}
            </div>
          ) : (
            <div className="trip-results__list">
              {visibleAnnouncements.map((announcement, index) => {
                const departure =
                  announcement.departingFrom || 'Départ à préciser';
                const destination =
                  announcement.arrivingAt ||
                  announcement.arriving_at ||
                  'Destination à préciser';
                const weight =
                  announcement.weightAvailability ??
                  announcement.weight_availability;
                const id = announcement.id ?? announcement._id ?? index;

                return (
                  <article
                    className="trip-row"
                    data-testid="trip-result"
                    key={id}
                    style={{ '--trip-index': index } as CSSProperties}
                  >
                    <div className="trip-row__route">
                      <span>{getCorridor(announcement)}</span>
                      <h3>
                        {departure}
                        <i
                          className="bx bx-right-arrow-alt"
                          aria-hidden="true"
                        ></i>
                        {destination}
                      </h3>
                      {announcement.description && (
                        <p>{announcement.description}</p>
                      )}
                    </div>

                    <dl>
                      <div>
                        <dt>Départ</dt>
                        <dd>
                          {announcement.departureDate
                            ? formatFrenchDate(announcement.departureDate)
                            : 'Date à convenir'}
                        </dd>
                      </div>
                      <div>
                        <dt>Capacité</dt>
                        <dd>{weight ? `${weight} kg` : 'À préciser'}</dd>
                      </div>
                      <div>
                        <dt>Tarif</dt>
                        <dd>{formatPrice(announcement.price)}</dd>
                      </div>
                    </dl>

                    {announcement.memberId ? (
                      <Link
                        className="trip-row__profile"
                        to={`/members/${announcement.memberId}`}
                      >
                        Voir le profil
                        <i
                          className="bx bx-right-arrow-alt"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    ) : (
                      <span className="trip-row__availability">
                        <i
                          className="bx bx-check-shield"
                          aria-hidden="true"
                        ></i>
                        Trajet publié
                      </span>
                    )}
                  </article>
                );
              })}
              {hasMoreResults && (
                <button
                  className="trip-results__more"
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 8)}
                >
                  Afficher plus de trajets
                  <span>
                    {filteredAnnouncements.length - visibleCount} restants
                  </span>
                </button>
              )}
            </div>
          )}
        </section>

        <aside className="trip-market__trust" aria-label="Garanties Chayé">
          <p>
            <i className="bx bx-check-shield" aria-hidden="true"></i>
            Identité et coordonnées vérifiées
          </p>
          <p>
            <i className="bx bx-lock-alt" aria-hidden="true"></i>
            Paiement protégé jusqu’à la livraison
          </p>
          <Link to="/#confiance">Découvrir le cadre de confiance</Link>
        </aside>
      </main>

      <BrandFooter />
    </div>
  );
}

export default AnnouncementsPage;
