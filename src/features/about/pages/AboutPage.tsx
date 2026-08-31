import styled from 'styled-components';

function AboutPage() {
  return (
    <Page className="container">
      <Content>
        <h1>À propos de Chayé</h1>
        <p>
          Chayé met en relation des particuliers qui souhaitent expédier un
          colis et des voyageurs capables de proposer une capacité disponible
          sur leur trajet.
        </p>
        <p>
          Le service vise les échanges entre territoires, avec une attention
          particulière portée à la confiance, à la clarté des annonces et à la
          modération des comportements abusifs.
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
`;

export default AboutPage;
