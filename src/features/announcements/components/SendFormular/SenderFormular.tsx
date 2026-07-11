import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createAnnouncement } from '../../api/announcements.api';
import { useAccountRestrictions } from '../../../members/components/AccountStatusNotice';
import ChoiceCarrierOrSender from '../../../../components/ChoiceCarrierOrSender';
import { flightDestinationCatalog } from '../../../../assets/flightDestinationsAfriqueAntilles';
import {
  shippingAnnouncementSchema,
  type ShippingAnnouncementFormInput,
  type ShippingAnnouncementFormOutput,
} from '../../announcement.schemas';

const emptyForm: ShippingAnnouncementFormInput = {
  arrivingAt: '',
  departingFrom: '',
  description: '',
  packageContentDescription: '',
  packageDepthCm: '',
  packageHeightCm: '',
  packageWeightKg: '',
  packageWidthCm: '',
  price: '',
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

const SenderFormular = () => {
  const { isRestricted } = useAccountRestrictions();
  const form = useForm<
    ShippingAnnouncementFormInput,
    unknown,
    ShippingAnnouncementFormOutput
  >({
    defaultValues: emptyForm,
    mode: 'onChange',
    resolver: zodResolver(shippingAnnouncementSchema),
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'error' | 'success' | 'idle'>('idle');
  const {
    formState: { errors, isSubmitting, isValid },
    register,
  } = form;

  const handleSubmit = form.handleSubmit(async (values) => {
    setMessage('');
    setStatus('idle');

    try {
      await createAnnouncement({
        type: 'shipping',
        description: values.description,
        departingFrom: values.departingFrom,
        arrivingAt: values.arrivingAt,
        packageWeightKg: values.packageWeightKg,
        packageHeightCm: values.packageHeightCm,
        packageWidthCm: values.packageWidthCm,
        packageDepthCm: values.packageDepthCm,
        packageContentDescription: values.packageContentDescription,
        price: values.price,
      });
      form.reset(emptyForm);
      setStatus('success');
      setMessage('Annonce colis créée en brouillon.');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Impossible de créer cette annonce.',
      );
    }
  });

  return (
    <>
      <ChoiceCarrierOrSender />
      <Page className="container">
        <FormHeader>
          <h1>J’expédie un colis</h1>
          <p>
            Publiez une demande d’expédition avec les dimensions du colis et le
            budget proposé.
          </p>
        </FormHeader>

        <FormCard onSubmit={handleSubmit} noValidate>
          <SectionTitle>Trajet</SectionTitle>
          <FieldsGrid>
            <Field>
              <RequiredLabel>Départ</RequiredLabel>
              <input
                list="shipping-departure-airports"
                placeholder="Paris-Orly"
                aria-invalid={Boolean(errors.departingFrom)}
                {...register('departingFrom')}
              />
              <FieldError>{errors.departingFrom?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Arrivée</RequiredLabel>
              <input
                list="shipping-arrival-airports"
                placeholder="Aéroport Martinique Aimé Césaire"
                aria-invalid={Boolean(errors.arrivingAt)}
                {...register('arrivingAt')}
              />
              <FieldError>{errors.arrivingAt?.message}</FieldError>
            </Field>
          </FieldsGrid>

          <SectionTitle>Colis</SectionTitle>
          <Field>
            <RequiredLabel>Description de l’annonce</RequiredLabel>
            <textarea
              placeholder="Je souhaite envoyer un colis vers Fort-de-France"
              aria-invalid={Boolean(errors.description)}
              {...register('description')}
            />
            <FieldError>{errors.description?.message}</FieldError>
          </Field>
          <Field>
            <RequiredLabel>Contenu du colis</RequiredLabel>
            <textarea
              placeholder="Documents administratifs, vêtements, petit matériel..."
              aria-invalid={Boolean(errors.packageContentDescription)}
              {...register('packageContentDescription')}
            />
            <FieldError>{errors.packageContentDescription?.message}</FieldError>
          </Field>
          <FieldsGrid>
            <Field>
              <RequiredLabel>Poids colis (kg)</RequiredLabel>
              <input
                type="number"
                min="0.1"
                step="0.1"
                aria-invalid={Boolean(errors.packageWeightKg)}
                {...register('packageWeightKg')}
              />
              <FieldError>{errors.packageWeightKg?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Hauteur (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                aria-invalid={Boolean(errors.packageHeightCm)}
                {...register('packageHeightCm')}
              />
              <FieldError>{errors.packageHeightCm?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Largeur (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                aria-invalid={Boolean(errors.packageWidthCm)}
                {...register('packageWidthCm')}
              />
              <FieldError>{errors.packageWidthCm?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Profondeur (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                aria-invalid={Boolean(errors.packageDepthCm)}
                {...register('packageDepthCm')}
              />
              <FieldError>{errors.packageDepthCm?.message}</FieldError>
            </Field>
            <Field>
              <RequiredLabel>Prix proposé (€)</RequiredLabel>
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
              {isSubmitting ? 'Publication...' : 'Publier la demande'}
            </SubmitButton>
          </Actions>
        </FormCard>
      </Page>

      <AirportDatalist id="shipping-departure-airports" />
      <AirportDatalist id="shipping-arrival-airports" />
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

export default SenderFormular;
