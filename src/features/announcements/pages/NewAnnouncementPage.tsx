import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NewAnnouncementPage() {
  return (
    <Page className="container">
      <Panel>
        <p>Nouvelle annonce</p>
        <h1>Choisir le type d’annonce</h1>
        <Choices aria-label="Types d'annonces">
          <Choice to="/sender">
            <strong>J’expédie</strong>
            <span>
              Publier un colis à envoyer avec poids, dimensions et prix.
            </span>
          </Choice>
          <Choice to="/carrier">
            <strong>Je transporte</strong>
            <span>Publier une capacité disponible avec trajet et vol.</span>
          </Choice>
        </Choices>
      </Panel>
    </Page>
  );
}

const Page = styled.main`
  padding: 48px 0 80px;
`;

const Panel = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 14px 35px rgb(47 43 58 / 8%);
  padding: 32px;

  p {
    color: #5a4aa3;
    font-weight: 700;
    margin: 0 0 8px;
  }

  h1 {
    margin: 0 0 24px;
  }
`;

const Choices = styled.nav`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const Choice = styled(Link)`
  background: #f4f2fb;
  border: 2px solid transparent;
  border-radius: 8px;
  color: #2f2b3a;
  display: grid;
  gap: 8px;
  padding: 22px;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    border-color: #5a4aa3;
    outline: none;
  }

  strong {
    color: #5a4aa3;
    font-size: 1.25rem;
  }

  span {
    color: #5d586b;
  }
`;

export default NewAnnouncementPage;
