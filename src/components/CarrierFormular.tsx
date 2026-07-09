import { ChangeEvent, FormEvent, lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createAnnouncement } from './API/apiManager';
import { useAccountRestrictions } from './AccountStatusNotice';
import ChoiceCarrierOrSender from './ChoiceCarrierOrSender';
import { flightDestinationCatalog } from '../assets/flightDestinationsAfriqueAntilles';
import type { FlightTicketData } from '../features/ticket-scanner/types/FlightTicketData';

const TicketImageInput = lazy(() =>
  import('../features/ticket-scanner/components/TicketImageInput').then(
    (module) => ({
      default: module.TicketImageInput,
    })
  )
);

type TransportFormState = {
  arrivalAirport: string;
  arrivingAt: string;
  departureAirport: string;
  departingFrom: string;
  description: string;
  flightArrivalAt: string;
  flightDepartureAt: string;
  price: string;
  transportAvailableHeightCm: string;
  transportAvailableWeightKg: string;
  transportAvailableWidthCm: string;
};

const emptyForm: TransportFormState = {
  arrivalAirport: '',
  arrivingAt: '',
  departureAirport: '',
  departingFrom: '',
  description: '',
  flightArrivalAt: '',
  flightDepartureAt: '',
  price: '',
  transportAvailableHeightCm: '',
  transportAvailableWeightKg: '',
  transportAvailableWidthCm: '',
};

const airportOptions = [
  ...flightDestinationCatalog.popularEuropeanGatewayAirports.flatMap(
    (gateway) => gateway.airports
  ),
  ...[
    ...flightDestinationCatalog.destinations.africa,
    ...flightDestinationCatalog.destinations.antilles,
  ].flatMap((destination) => destination.airports),
];

const CarrierFormular = () => {
  const { isRestricted } = useAccountRestrictions();
  const [form, setForm] = useState<TransportFormState>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'error' | 'success' | 'idle'>('idle');
  const [ticketReadMessage, setTicketReadMessage] = useState('');
  const isFormComplete = isTransportFormComplete(form);

  const handleChange =
    (name: keyof TransportFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((currentForm) => ({
        ...currentForm,
        [name]: event.target.value,
      }));
    };

  const handleAirportChange =
    (name: 'arrivalAirport' | 'departureAirport') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const airportName = event.target.value;
      const airport = airportOptions.find(
        (option) => option.name === airportName
      );

      setForm((currentForm) => ({
        ...currentForm,
        [name]: airportName,
        ...(name === 'departureAirport'
          ? {
              departingFrom: airportName,
              departureAirport: airport?.iata ?? airportName,
            }
          : {
              arrivingAt: airportName,
              arrivalAirport: airport?.iata ?? airportName,
            }),
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setStatus('idle');

    try {
      await createAnnouncement({
        type: 'transport',
        description: form.description,
        departingFrom: form.departingFrom,
        arrivingAt: form.arrivingAt,
        transportAvailableWeightKg: toNumber(form.transportAvailableWeightKg),
        transportAvailableHeightCm: toNumber(form.transportAvailableHeightCm),
        transportAvailableWidthCm: toNumber(form.transportAvailableWidthCm),
        flightDepartureAt: toIsoDateTime(form.flightDepartureAt),
        flightArrivalAt: toIsoDateTime(form.flightArrivalAt),
        departureAirport: form.departureAirport.trim() || undefined,
        arrivalAirport: form.arrivalAirport.trim() || undefined,
        price: toNumber(form.price),
      });
      setForm(emptyForm);
      setStatus('success');
      setMessage('Annonce transport créée en brouillon.');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Impossible de créer cette annonce.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTicketRead = (ticket: FlightTicketData) => {
    setForm((currentForm) => ({
      ...currentForm,
      departureAirport:
        ticket.departureAirportCode ?? currentForm.departureAirport,
      arrivalAirport: ticket.arrivalAirportCode ?? currentForm.arrivalAirport,
      departingFrom: ticket.departureAirportName ?? currentForm.departingFrom,
      arrivingAt: ticket.arrivalAirportName ?? currentForm.arrivingAt,
      flightDepartureAt:
        ticket.flightDepartureAt ?? currentForm.flightDepartureAt,
      flightArrivalAt: ticket.flightArrivalAt ?? currentForm.flightArrivalAt,
      description: buildDescriptionFromTicket(ticket, currentForm.description),
    }));
    setTicketReadMessage(formatTicketReadMessage(ticket));
  };

  return (
    <>
      <ChoiceCarrierOrSender />
      <Page className="container">
        <FormHeader>
          <h1>Je transporte un colis</h1>
          <p>
            Publiez la capacité disponible sur votre trajet avec les dimensions
            acceptées et les informations de vol.
          </p>
        </FormHeader>

        <FormCard onSubmit={handleSubmit}>
          <Suspense
            fallback={
              <ScannerFallback>
                Chargement du scanner de billet...
              </ScannerFallback>
            }
          >
            <TicketImageInput onTicketRead={handleTicketRead} />
          </Suspense>
          {ticketReadMessage ? (
            <TicketFeedback>{ticketReadMessage}</TicketFeedback>
          ) : null}

          <SectionTitle>Trajet et vol</SectionTitle>
          <FieldsGrid>
            <Field>
              <RequiredLabel>Aéroport de départ</RequiredLabel>
              <input
                list="transport-departure-airports"
                value={form.departingFrom}
                onChange={handleAirportChange('departureAirport')}
                placeholder="Paris-Orly"
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Aéroport d’arrivée</RequiredLabel>
              <input
                list="transport-arrival-airports"
                value={form.arrivingAt}
                onChange={handleAirportChange('arrivalAirport')}
                placeholder="Aéroport Martinique Aimé Césaire"
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Code IATA départ</RequiredLabel>
              <input
                value={form.departureAirport}
                onChange={handleChange('departureAirport')}
                placeholder="ORY"
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Code IATA arrivée</RequiredLabel>
              <input
                value={form.arrivalAirport}
                onChange={handleChange('arrivalAirport')}
                placeholder="FDF"
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Départ du vol</RequiredLabel>
              <input
                type="datetime-local"
                value={form.flightDepartureAt}
                onChange={handleChange('flightDepartureAt')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Arrivée du vol</RequiredLabel>
              <input
                type="datetime-local"
                value={form.flightArrivalAt}
                onChange={handleChange('flightArrivalAt')}
                required
              />
            </Field>
          </FieldsGrid>

          <SectionTitle>Capacité disponible</SectionTitle>
          <Field>
            <RequiredLabel>Description de l’annonce</RequiredLabel>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Je peux transporter un colis sur mon vol Paris - Fort-de-France"
              required
            />
          </Field>
          <FieldsGrid>
            <Field>
              <RequiredLabel>Poids disponible (kg)</RequiredLabel>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={form.transportAvailableWeightKg}
                onChange={handleChange('transportAvailableWeightKg')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Hauteur max (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                value={form.transportAvailableHeightCm}
                onChange={handleChange('transportAvailableHeightCm')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Largeur max (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                value={form.transportAvailableWidthCm}
                onChange={handleChange('transportAvailableWidthCm')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Prix demandé (€)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                value={form.price}
                onChange={handleChange('price')}
                required
              />
            </Field>
          </FieldsGrid>

          {message ? <Feedback $status={status}>{message}</Feedback> : null}

          <Actions>
            <SecondaryLink to="/annonces">Voir les annonces</SecondaryLink>
            <SubmitButton
              type="submit"
              disabled={isRestricted || isSubmitting || !isFormComplete}
              title={
                isRestricted
                  ? 'Action indisponible avec un compte suspendu ou banni'
                  : !isFormComplete
                    ? 'Remplissez tous les champs obligatoires'
                    : undefined
              }
            >
              {isSubmitting ? 'Publication...' : 'Publier le trajet'}
            </SubmitButton>
          </Actions>
        </FormCard>
      </Page>

      <AirportDatalist id="transport-departure-airports" />
      <AirportDatalist id="transport-arrival-airports" />
    </>
  );
};

const AirportDatalist = ({ id }: { id: string }) => (
  <datalist id={id}>
    {airportOptions.map((airport) => (
      <option
        key={`${id}-${airport.iata}-${airport.name}`}
        value={airport.name}
      >
        {airport.city}
      </option>
    ))}
  </datalist>
);

const toNumber = (value: string) => Number(value.replace(',', '.'));

const isTransportFormComplete = (form: TransportFormState) =>
  [
    form.departingFrom,
    form.arrivingAt,
    form.departureAirport,
    form.arrivalAirport,
    form.flightDepartureAt,
    form.flightArrivalAt,
    form.description,
  ].every((value) => value.trim().length > 0) &&
  hasPositiveNumber(form.transportAvailableWeightKg) &&
  hasPositiveNumber(form.transportAvailableHeightCm) &&
  hasPositiveNumber(form.transportAvailableWidthCm) &&
  hasPositiveNumber(form.price);

const hasPositiveNumber = (value: string) => {
  const parsedValue = toNumber(value);

  return Number.isFinite(parsedValue) && parsedValue > 0;
};

const toIsoDateTime = (value: string) => {
  if (!value) {
    return undefined;
  }

  return new Date(value).toISOString();
};

const buildDescriptionFromTicket = (
  ticket: FlightTicketData,
  currentDescription: string
) => {
  if (currentDescription.trim()) {
    return currentDescription;
  }

  const departure = ticket.departureAirportName ?? ticket.departureAirportCode;
  const arrival = ticket.arrivalAirportName ?? ticket.arrivalAirportCode;
  const flight = ticket.flightNumber ? ` (${ticket.flightNumber})` : '';

  if (!departure || !arrival) {
    return currentDescription;
  }

  return `Je peux transporter un colis sur mon vol ${departure} - ${arrival}${flight}`;
};

const formatTicketReadMessage = (ticket: FlightTicketData) => {
  const source =
    ticket.source === 'barcode'
      ? 'code-barres'
      : `OCR${ticket.confidence ? ` ${Math.round(ticket.confidence)}%` : ''}`;
  const fields = [
    ticket.departureAirportCode ? 'départ' : null,
    ticket.arrivalAirportCode ? 'arrivée' : null,
    ticket.flightDepartureAt ? 'heure départ' : null,
    ticket.flightArrivalAt ? 'heure arrivée' : null,
    ticket.flightNumber ? 'vol' : null,
  ].filter(Boolean);
  const dateDetails = [
    ticket.flightDepartureAt
      ? `départ du vol ${formatDatetimeLocalForDisplay(ticket.flightDepartureAt)}`
      : null,
    ticket.flightArrivalAt
      ? `arrivée du vol ${formatDatetimeLocalForDisplay(ticket.flightArrivalAt)}`
      : null,
  ].filter(Boolean);

  return `Billet analysé via ${source}. Champs trouvés : ${
    fields.length ? fields.join(', ') : 'aucun champ fiable'
  }.${
    dateDetails.length ? ` Pré-remplissage : ${dateDetails.join(', ')}.` : ''
  } Vérifiez avant publication.`;
};

const formatDatetimeLocalForDisplay = (value: string) => {
  const [date, time] = value.split('T');

  if (!date || !time) {
    return value;
  }

  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year} ${time}`;
};

const Page = styled.main`
  padding-bottom: 56px;
`;

const FormHeader = styled.header`
  background: #56469f;
  border-radius: 8px;
  color: #fff;
  margin-top: 25px;
  padding: 32px;
  text-align: center;

  h1 {
    font-size: 30px;
    margin: 0 0 12px;
  }

  p {
    margin: 0 auto;
    max-width: 680px;
  }
`;

const FormCard = styled.form`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(35, 35, 35, 0.08);
  display: grid;
  gap: 20px;
  margin-top: 25px;
  padding: 28px;
`;

const SectionTitle = styled.h2`
  color: #1f1f1f;
  font-size: 22px;
  margin: 8px 0 0;
`;

const FieldsGrid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
`;

const Field = styled.label`
  display: grid;
  gap: 8px;

  span {
    color: #303030;
    font-weight: 800;
  }

  input,
  textarea {
    border: 1px solid #ddd;
    border-radius: 8px;
    font: inherit;
    min-width: 0;
    padding: 12px 14px;
  }

  textarea {
    min-height: 96px;
    resize: vertical;
  }
`;

const RequiredLabel = styled.span`
  &::before {
    color: #ef604f;
    content: '* ';
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  background: #ef604f;
  border: 0;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-weight: 800;
  padding: 12px 18px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const SecondaryLink = styled(Link)`
  align-items: center;
  background: #f3f0ff;
  border-radius: 8px;
  color: #56469f;
  display: inline-flex;
  font-weight: 800;
  padding: 12px 18px;
  text-decoration: none;
`;

const Feedback = styled.p<{ $status: 'error' | 'success' | 'idle' }>`
  background: ${({ $status }) =>
    $status === 'success' ? '#edf8ef' : '#fff1ef'};
  border-left: 4px solid
    ${({ $status }) => ($status === 'success' ? '#299c46' : '#ef604f')};
  border-radius: 8px;
  margin: 0;
  padding: 12px 14px;
`;

const TicketFeedback = styled.p`
  background: #edf8ef;
  border-left: 4px solid #299c46;
  border-radius: 8px;
  color: #1f1f1f;
  margin: 0;
  padding: 12px 14px;
`;

const ScannerFallback = styled.p`
  background: #f8f7fc;
  border: 1px solid #ded9f4;
  border-radius: 8px;
  color: #4f4294;
  font-weight: 800;
  margin: 0;
  padding: 18px;
`;

export default CarrierFormular;
