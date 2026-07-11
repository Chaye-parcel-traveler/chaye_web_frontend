import { zodResolver } from '@hookform/resolvers/zod';
import { lazy, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createAnnouncement } from '../api/announcements.api';
import { useAccountRestrictions } from '../../members/components/AccountStatusNotice';
import ChoiceCarrierOrSender from '../../../components/ChoiceCarrierOrSender';
import { flightDestinationCatalog } from '../../../assets/flightDestinationsAfriqueAntilles';
import type { FlightTicketData } from '../../ticket-scanner/types/FlightTicketData';
import {
  transportAnnouncementSchema,
  type TransportAnnouncementFormInput,
  type TransportAnnouncementFormOutput,
} from '../announcement.schemas';

const TicketImageInput = lazy(() =>
  import('../../ticket-scanner/components/TicketImageInput').then((module) => ({
    default: module.TicketImageInput,
  })),
);

const emptyForm: TransportAnnouncementFormInput = {
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
    (gateway) => gateway.airports,
  ),
  ...[
    ...flightDestinationCatalog.destinations.africa,
    ...flightDestinationCatalog.destinations.antilles,
  ].flatMap((destination) => destination.airports),
];

const CarrierFormular = () => {
  const { isRestricted } = useAccountRestrictions();
  const form = useForm<
    TransportAnnouncementFormInput,
    unknown,
    TransportAnnouncementFormOutput
  >({
    defaultValues: emptyForm,
    mode: 'onChange',
    resolver: zodResolver(transportAnnouncementSchema),
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'error' | 'success' | 'idle'>('idle');
  const [ticketReadMessage, setTicketReadMessage] = useState('');
  const {
    formState: { errors, isSubmitting, isValid },
    register,
    setValue,
  } = form;

  const handleAirportChange =
    (name: 'arrivalAirport' | 'departureAirport') => (airportName: string) => {
      const airport = airportOptions.find(
        (option) => option.name === airportName,
      );

      if (name === 'departureAirport') {
        setValue('departingFrom', airportName, { shouldValidate: true });
        setValue('departureAirport', airport?.iata ?? airportName, {
          shouldValidate: true,
        });
        return;
      }

      setValue('arrivingAt', airportName, { shouldValidate: true });
      setValue('arrivalAirport', airport?.iata ?? airportName, {
        shouldValidate: true,
      });
    };

  const handleSubmit = form.handleSubmit(async (values) => {
    setMessage('');
    setStatus('idle');

    try {
      await createAnnouncement({
        type: 'transport',
        description: values.description,
        departingFrom: values.departingFrom,
        arrivingAt: values.arrivingAt,
        transportAvailableWeightKg: values.transportAvailableWeightKg,
        transportAvailableHeightCm: values.transportAvailableHeightCm,
        transportAvailableWidthCm: values.transportAvailableWidthCm,
        flightDepartureAt: toIsoDateTime(values.flightDepartureAt),
        flightArrivalAt: toIsoDateTime(values.flightArrivalAt),
        departureAirport: values.departureAirport,
        arrivalAirport: values.arrivalAirport,
        price: values.price,
      });
      form.reset(emptyForm);
      setStatus('success');
      setMessage('Annonce transport créée en brouillon.');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Impossible de créer cette annonce.',
      );
    }
  });

  const handleTicketRead = (ticket: FlightTicketData) => {
    const currentDescription = form.getValues('description');
    const updates: Partial<TransportAnnouncementFormInput> = {
      arrivalAirport:
        ticket.arrivalAirportCode ?? form.getValues('arrivalAirport'),
      arrivingAt: ticket.arrivalAirportName ?? form.getValues('arrivingAt'),
      departureAirport:
        ticket.departureAirportCode ?? form.getValues('departureAirport'),
      departingFrom:
        ticket.departureAirportName ?? form.getValues('departingFrom'),
      description: buildDescriptionFromTicket(ticket, currentDescription),
      flightArrivalAt:
        ticket.flightArrivalAt ?? form.getValues('flightArrivalAt'),
      flightDepartureAt:
        ticket.flightDepartureAt ?? form.getValues('flightDepartureAt'),
    };

    Object.entries(updates).forEach(([name, value]) => {
      setValue(name as keyof TransportAnnouncementFormInput, value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
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

        <FormCard onSubmit={handleSubmit} noValidate>
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
                placeholder="Paris-Orly"
                aria-invalid={Boolean(errors.departingFrom)}
                {...register('departingFrom', {
                  onChange: (event) =>
                    handleAirportChange('departureAirport')(event.target.value),
                })}
              />
              <FieldError>{errors.departingFrom?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Aéroport d’arrivée</RequiredLabel>
              <input
                list="transport-arrival-airports"
                placeholder="Aéroport Martinique Aimé Césaire"
                aria-invalid={Boolean(errors.arrivingAt)}
                {...register('arrivingAt', {
                  onChange: (event) =>
                    handleAirportChange('arrivalAirport')(event.target.value),
                })}
              />
              <FieldError>{errors.arrivingAt?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Code IATA départ</RequiredLabel>
              <input
                placeholder="ORY"
                aria-invalid={Boolean(errors.departureAirport)}
                {...register('departureAirport')}
              />
              <FieldError>{errors.departureAirport?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Code IATA arrivée</RequiredLabel>
              <input
                placeholder="FDF"
                aria-invalid={Boolean(errors.arrivalAirport)}
                {...register('arrivalAirport')}
              />
              <FieldError>{errors.arrivalAirport?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Départ du vol</RequiredLabel>
              <input
                type="datetime-local"
                aria-invalid={Boolean(errors.flightDepartureAt)}
                {...register('flightDepartureAt')}
              />
              <FieldError>{errors.flightDepartureAt?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Arrivée du vol</RequiredLabel>
              <input
                type="datetime-local"
                aria-invalid={Boolean(errors.flightArrivalAt)}
                {...register('flightArrivalAt')}
              />
              <FieldError>{errors.flightArrivalAt?.message}</FieldError>
            </Field>
          </FieldsGrid>

          <SectionTitle>Capacité disponible</SectionTitle>
          <Field>
            <RequiredLabel>Description de l’annonce</RequiredLabel>
            <textarea
              placeholder="Je peux transporter un colis sur mon vol Paris - Fort-de-France"
              aria-invalid={Boolean(errors.description)}
              {...register('description')}
            />
            <FieldError>{errors.description?.message}</FieldError>
          </Field>
          <FieldsGrid>
            <Field>
              <RequiredLabel>Poids disponible (kg)</RequiredLabel>
              <input
                type="number"
                min="0.1"
                step="0.1"
                aria-invalid={Boolean(errors.transportAvailableWeightKg)}
                {...register('transportAvailableWeightKg')}
              />
              <FieldError>
                {errors.transportAvailableWeightKg?.message}
              </FieldError>
            </Field>
            <Field>
              <RequiredLabel>Hauteur max (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                aria-invalid={Boolean(errors.transportAvailableHeightCm)}
                {...register('transportAvailableHeightCm')}
              />
              <FieldError>
                {errors.transportAvailableHeightCm?.message}
              </FieldError>
            </Field>
            <Field>
              <RequiredLabel>Largeur max (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                aria-invalid={Boolean(errors.transportAvailableWidthCm)}
                {...register('transportAvailableWidthCm')}
              />
              <FieldError>
                {errors.transportAvailableWidthCm?.message}
              </FieldError>
            </Field>
            <Field>
              <RequiredLabel>Prix demandé (€)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                aria-invalid={Boolean(errors.price)}
                {...register('price')}
              />
              <FieldError>{errors.price?.message}</FieldError>
            </Field>
          </FieldsGrid>

          {message ? <Feedback $status={status}>{message}</Feedback> : null}

          <Actions>
            <SecondaryLink to="/annonces">Voir les annonces</SecondaryLink>
            <SubmitButton
              type="submit"
              disabled={isRestricted || isSubmitting || !isValid}
              title={
                isRestricted
                  ? 'Action indisponible avec un compte suspendu ou banni'
                  : !isValid
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

const toIsoDateTime = (value: string) => {
  if (!value) {
    return undefined;
  }

  return new Date(value).toISOString();
};

const buildDescriptionFromTicket = (
  ticket: FlightTicketData,
  currentDescription: string,
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

const FieldError = styled.small`
  color: #c7352a;
  min-height: 18px;
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
