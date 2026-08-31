import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SupportPage() {
  return (
    <Page className="container">
      <Content>
        <h1>Support Chayé</h1>
        <p>
          Pour une question sur une annonce, une discussion, un signalement ou
          une réservation, contactez l’équipe support Chayé.
        </p>
        <p>
          Les coordonnées support définitives sont en attente de validation.
        </p>
        <p>
          Consultez aussi les <Link to="/legal-notice">mentions légales</Link>{' '}
          et la <Link to="/privacy-policy">politique de confidentialité</Link>.
        </p>
      </Content>
    </Page>
  );
}

const Page = styled.main`
  background: #f4f3fa;
  min-height: calc(100vh - 90px);
  padding: 40px 16px;
`;

const Content = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(42, 35, 80, 0.12);
  margin: 0 auto;
  max-width: 860px;
  padding: 34px;

  h1 {
    color: #4f4294;
    font-size: 32px;
    margin-top: 0;
  }

  p {
    color: #5f5c68;
    line-height: 1.55;
  }

  a {
    color: #4f4294;
    font-weight: 800;
  }
`;

export default SupportPage;
