import { Link } from 'react-router-dom';
import BrandFooter from '../../../components/BrandFooter';
import BrandHeader from '../../../components/BrandHeader';
import './HomePage.css';

function HomePage() {
  return (
    <div className="chaye-home">
      <BrandHeader
        actionLabel="Se connecter"
        actionTo="/auth"
        links={[
          { label: 'Comment ça marche', to: '#fonctionnement' },
          { label: 'Confiance', to: '#confiance' },
          { label: 'Destinations', to: '#destinations' },
        ]}
        variant="overlay"
      />

      <main>
        <section className="chaye-hero" aria-labelledby="home-title">
          <div className="chaye-hero__content">
            <p className="chaye-home__eyebrow">
              Transport collaboratif de colis
            </p>
            <h1 id="home-title">La confiance voyage avec vous.</h1>
            <p className="chaye-hero__intro">
              Envoyez vos colis entre la France, les territoires d’outre-mer et
              l’Afrique francophone grâce à des voyageurs vérifiés.
            </p>

            <div className="chaye-hero__actions">
              <Link
                className="chaye-button chaye-button--primary"
                to="/packages/new"
              >
                J’expédie un colis
                <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
              </Link>
              <Link
                className="chaye-button chaye-button--secondary"
                to="/announcements/new"
              >
                Je propose un trajet
              </Link>
            </div>

            <p className="chaye-hero__reassurance">
              <i className="bx bx-check-shield" aria-hidden="true"></i>
              Identités vérifiées · Paiement protégé · Suivi du colis
            </p>
          </div>
          <a
            className="chaye-hero__scroll"
            href="#fonctionnement"
            aria-label="Découvrir le fonctionnement"
          >
            <span aria-hidden="true"></span>
            Découvrir
          </a>
        </section>

        <section
          className="chaye-process chaye-home__section"
          id="fonctionnement"
          aria-labelledby="process-title"
        >
          <div className="chaye-home__section-heading">
            <p className="chaye-home__eyebrow">Simple et humain</p>
            <h2 id="process-title">
              Un même réseau, deux façons de participer.
            </h2>
            <p>
              Chayé met en relation ceux qui ont un colis à envoyer et ceux qui
              ont de la place dans leurs bagages.
            </p>
          </div>

          <ol className="chaye-process__steps">
            <li>
              <span>01</span>
              <div>
                <h3>Publiez votre besoin</h3>
                <p>
                  Renseignez le trajet, les dates, le poids et le contenu du
                  colis.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Choisissez en confiance</h3>
                <p>
                  Consultez les trajets compatibles et échangez avant de vous
                  engager.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Suivez jusqu’à l’arrivée</h3>
                <p>
                  Chaque étape est tracée, de la prise en charge à la
                  confirmation de livraison.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section
          className="chaye-trust"
          id="confiance"
          aria-labelledby="trust-title"
        >
          <div className="chaye-trust__visual" aria-hidden="true">
            <div className="chaye-trust__route">
              <span>France</span>
              <i className="bx bxs-plane-alt"></i>
              <span>Fort-de-France</span>
            </div>
          </div>

          <div className="chaye-trust__content">
            <p className="chaye-home__eyebrow">La sécurité à chaque étape</p>
            <h2 id="trust-title">Un lien humain, un cadre rassurant.</h2>
            <p className="chaye-trust__lead">
              Vous gardez la visibilité et le contrôle, du premier échange à la
              remise au destinataire.
            </p>

            <ul>
              <li>
                <i className="bx bx-id-card" aria-hidden="true"></i>
                <div>
                  <strong>Communauté vérifiée</strong>
                  <span>
                    Email et téléphone confirmés avant la transaction.
                  </span>
                </div>
              </li>
              <li>
                <i className="bx bx-lock-alt" aria-hidden="true"></i>
                <div>
                  <strong>Paiement protégé</strong>
                  <span>
                    Les fonds sont libérés après la livraison confirmée.
                  </span>
                </div>
              </li>
              <li>
                <i className="bx bx-package" aria-hidden="true"></i>
                <div>
                  <strong>Contenu déclaré</strong>
                  <span>
                    Chaque colis est décrit et accepté avant sa prise en charge.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="chaye-corridors chaye-home__section"
          id="destinations"
          aria-labelledby="corridors-title"
        >
          <div className="chaye-corridors__intro">
            <p className="chaye-home__eyebrow">
              Deux corridors, une communauté
            </p>
            <h2 id="corridors-title">
              Plus proche des familles, ici comme là-bas.
            </h2>
          </div>

          <div className="chaye-corridors__routes">
            <article>
              <div className="chaye-corridors__number">01</div>
              <div>
                <p>Corridor outre-mer</p>
                <h3>France ↔ Antilles & territoires ultramarins</h3>
                <span>
                  Martinique · Guadeloupe · Guyane · Réunion · Mayotte
                </span>
              </div>
            </article>
            <article>
              <div className="chaye-corridors__number">02</div>
              <div>
                <p>Corridor Afrique francophone</p>
                <h3>France ↔ Afrique de l’Ouest & centrale</h3>
                <span>Sénégal · Mali · Côte d’Ivoire · Cameroun · Guinée</span>
              </div>
            </article>
          </div>

          <Link className="chaye-text-link" to="/announcements">
            Explorer les trajets disponibles
            <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
          </Link>
        </section>

        <section className="chaye-final-cta" aria-labelledby="final-cta-title">
          <p className="chaye-home__eyebrow">
            Prêt à faire voyager l’essentiel ?
          </p>
          <h2 id="final-cta-title">Le prochain trajet commence ici.</h2>
          <div>
            <Link
              className="chaye-button chaye-button--light"
              to="/packages/new"
            >
              Envoyer un colis
            </Link>
            <Link
              className="chaye-button chaye-button--outline"
              to="/announcements/new"
            >
              Proposer un trajet
            </Link>
          </div>
        </section>
      </main>

      <BrandFooter />
    </div>
  );
}

export default HomePage;
