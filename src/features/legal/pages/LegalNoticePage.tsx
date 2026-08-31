import { Link } from 'react-router-dom';
import styled from 'styled-components';

function LegalNoticePage() {
  return (
    <Page className="container">
      <LegalCard>
        <h1>Mentions légales</h1>
        <p>
          Les informations société définitives de Chayé sont en attente de
          validation juridique avant publication.
        </p>

        <h2>Éditeur du service</h2>
        <dl>
          <div>
            <dt>Nom de la société</dt>
            <dd>Information en attente</dd>
          </div>
          <div>
            <dt>Adresse du siège</dt>
            <dd>Information en attente</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>Information en attente</dd>
          </div>
          <div>
            <dt>Directeur de publication</dt>
            <dd>Information en attente</dd>
          </div>
        </dl>

        <h2>Hébergement</h2>
        <p>
          Les informations relatives à l’hébergeur sont en attente de
          confirmation.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Le traitement des données personnelles est décrit dans la{' '}
          <Link to="/privacy-policy">politique de confidentialité</Link>.
        </p>

        <h2>Support</h2>
        <p>
          Pour toute demande liée au service, consulter la page{' '}
          <Link to="/support">support</Link>.
        </p>
      </LegalCard>
    </Page>
  );
}

const Page = styled.main`
  background: #f4f3fa;
  min-height: calc(100vh - 90px);
  padding: 40px 16px;
`;

const LegalCard = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(42, 35, 80, 0.12);
  color: #27252d;
  margin: 0 auto;
  max-width: 860px;
  padding: 34px;

  h1,
  h2,
  p,
  dl {
    margin-top: 0;
  }

  h1 {
    color: #4f4294;
    font-size: 32px;
    margin-bottom: 18px;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 28px;
  }

  p,
  dd {
    color: #5f5c68;
    line-height: 1.55;
  }

  dl {
    display: grid;
    gap: 14px;
  }

  dt {
    font-weight: 800;
  }

  dd {
    margin: 3px 0 0;
  }

  a {
    color: #4f4294;
    font-weight: 800;
  }
`;

export default LegalNoticePage;
