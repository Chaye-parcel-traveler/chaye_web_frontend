import styled from 'styled-components';
import { useAccountRestrictions } from './AccountStatusNotice';
import ReportButton from './ReportButton';

type Announcement = {
  id: number;
  description: string;
  departingFrom: string;
  arrivingAt: string;
  weightAvailability: number;
  price: number;
};

const announcements: Announcement[] = [
  {
    id: 1,
    description: 'Transport disponible vers la Guyane.',
    departingFrom: 'Paris',
    arrivingAt: 'Cayenne',
    weightAvailability: 12,
    price: 60,
  },
  {
    id: 2,
    description: 'Place disponible pour colis familial.',
    departingFrom: 'Lyon',
    arrivingAt: 'Fort-de-France',
    weightAvailability: 8,
    price: 45,
  },
  {
    id: 3,
    description: 'Trajet prévu avec bagage disponible.',
    departingFrom: 'Marseille',
    arrivingAt: 'Dakar',
    weightAvailability: 15,
    price: 70,
  },
];

const Announces = () => {
  const { isRestricted } = useAccountRestrictions();

  return (
    <Page className="container">
      <h2 className="txtLeft margin-top-36">Annonces</h2>
      <Grid>
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <strong>
                {announcement.departingFrom} → {announcement.arrivingAt}
              </strong>
              <ReportButton
                targetType="announcement"
                targetId={announcement.id}
                targetLabel="cette annonce"
              />
            </CardHeader>
            <p>{announcement.description}</p>
            <Details>
              <span>{announcement.weightAvailability} kg disponibles</span>
              <span>{announcement.price} €</span>
            </Details>
            <Actions>
              <PrimaryAction type="button" disabled={isRestricted}>
                Réserver
              </PrimaryAction>
              <SecondaryAction type="button" disabled={isRestricted}>
                Envoyer un message
              </SecondaryAction>
            </Actions>
          </Card>
        ))}
      </Grid>
    </Page>
  );
};

const Page = styled.main`
  padding-bottom: 48px;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-top: 25px;
`;

const Card = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 20px;

  p {
    color: #383838;
    line-height: 1.5;
    margin: 14px 0;
  }
`;

const CardHeader = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
  justify-content: space-between;

  strong {
    color: #4f4294;
    font-size: 18px;
  }
`;

const Details = styled.div`
  color: #1f1f1f;
  display: flex;
  font-weight: 700;
  gap: 12px;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`;

const PrimaryAction = styled.button`
  background: #4f4294;
  border: 0;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  font-weight: 800;
  padding: 10px 18px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

const SecondaryAction = styled(PrimaryAction)`
  background: #ec634e;
`;

export default Announces;
