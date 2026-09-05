import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function EditPackagePage() {
  const { id } = useParams();

  return (
    <Page className="container">
      <Panel>
        <p>Colis #{id}</p>
        <h1>Modification de colis indisponible</h1>
        <span>
          L’API actuelle ne fournit pas encore un workflow colis séparé fiable.
          Le parcours maintenu est le formulaire expéditeur.
        </span>
        <Actions>
          <Link to="/sender">Créer une annonce expéditeur</Link>
          <Link to="/annonces">Voir les annonces</Link>
        </Actions>
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
    margin: 0 0 12px;
  }

  span {
    color: #5d586b;
    display: block;
    max-width: 680px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 24px;

  a {
    background: #5a4aa3;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
    padding: 12px 18px;
    text-decoration: none;
  }

  a + a {
    background: #ee5d4f;
  }
`;

export default EditPackagePage;
