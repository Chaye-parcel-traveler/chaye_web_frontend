import styled from 'styled-components';

const questions = [
  {
    answer:
      'Chaye met en relation des expéditeurs et des voyageurs pour organiser le transport sécurisé de colis entre deux destinations.',
    question: 'Comment fonctionne Chaye ?',
  },
  {
    answer:
      'Un expéditeur publie une annonce avec le départ, la destination, le poids, les dimensions et le prix proposé.',
    question: 'Comment publier un colis à expédier ?',
  },
  {
    answer:
      'Un transporteur publie sa capacité disponible avec les informations de trajet, les dimensions acceptées et les informations de vol.',
    question: 'Comment proposer un transport ?',
  },
  {
    answer:
      'Les discussions permettent de clarifier les détails avant réservation. Les signalements et la modération encadrent les comportements à risque.',
    question: 'Comment se passe la mise en relation ?',
  },
  {
    answer:
      'Depuis le support ou les boutons de signalement disponibles sur les profils et annonces concernés.',
    question: 'Que faire en cas de problème ?',
  },
];

function FaqPage() {
  return (
    <Page className="container">
      <Hero>
        <p>Support</p>
        <h1>Questions fréquentes</h1>
      </Hero>

      <List aria-label="Questions fréquentes">
        {questions.map((item, index) => (
          <article key={item.question}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </div>
          </article>
        ))}
      </List>
    </Page>
  );
}

const Page = styled.main`
  padding: 48px 0 80px;
`;

const Hero = styled.header`
  background: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
  padding: 32px;

  p {
    color: #5a4aa3;
    font-weight: 700;
    margin: 0 0 8px;
  }

  h1 {
    margin: 0;
  }
`;

const List = styled.section`
  display: grid;
  gap: 16px;

  article {
    align-items: flex-start;
    background: #fff;
    border-radius: 8px;
    display: grid;
    gap: 18px;
    grid-template-columns: auto 1fr;
    padding: 24px;
  }

  span {
    color: #ee5d4f;
    font-size: 1.4rem;
    font-weight: 800;
  }

  h2 {
    font-size: 1.2rem;
    margin: 0 0 8px;
  }

  p {
    color: #5d586b;
    margin: 0;
  }
`;

export default FaqPage;
