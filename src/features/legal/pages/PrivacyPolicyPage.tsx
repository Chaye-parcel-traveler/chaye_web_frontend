import { Link } from 'react-router-dom';
import styled from 'styled-components';

function PrivacyPolicyPage() {
  return (
    <Page className="container">
      <PolicyCard>
        <h1>Politique de confidentialité</h1>
        <p>
          Cette page présente les principes de traitement des données
          personnelles pour Chayé. Les mentions juridiques définitives restent à
          compléter après validation.
        </p>

        <h2>Données collectées</h2>
        <ul>
          <li>informations de compte ;</li>
          <li>coordonnées nécessaires aux échanges entre membres ;</li>
          <li>données d’annonces, de réservations et de messagerie ;</li>
          <li>données nécessaires au support et à la modération.</li>
        </ul>

        <h2>Finalités</h2>
        <p>
          Les données sont utilisées pour permettre la mise en relation,
          sécuriser les échanges, gérer les signalements et améliorer le
          service.
        </p>

        <h2>Conservation et droits</h2>
        <p>
          Les durées de conservation, modalités d’exercice des droits et
          contacts légaux sont en attente de validation juridique.
        </p>

        <h2>Contact</h2>
        <p>
          Pour une demande liée aux données personnelles, utiliser la page{' '}
          <Link to="/support">support</Link> en attendant la publication du
          contact légal définitif.
        </p>
      </PolicyCard>
    </Page>
  );
}

const Page = styled.main`
  background: #f4f3fa;
  min-height: calc(100vh - 90px);
  padding: 40px 16px;
`;

const PolicyCard = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(42, 35, 80, 0.12);
  color: #27252d;
  margin: 0 auto;
  max-width: 860px;
  padding: 34px;

  h1 {
    color: #4f4294;
    font-size: 32px;
    margin-top: 0;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 28px;
  }

  p,
  li {
    color: #5f5c68;
    line-height: 1.55;
  }

  a {
    color: #4f4294;
    font-weight: 800;
  }
`;

export default PrivacyPolicyPage;
