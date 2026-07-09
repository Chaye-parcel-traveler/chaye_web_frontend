import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createAnnouncement } from '../API/apiManager';
import { useAccountRestrictions } from '../AccountStatusNotice';
import ChoiceCarrierOrSender from '../ChoiceCarrierOrSender';
import { flightDestinationCatalog } from '../../assets/flightDestinationsAfriqueAntilles';

type ShippingFormState = {
  arrivingAt: string;
  departingFrom: string;
  description: string;
  packageContentDescription: string;
  packageDepthCm: string;
  packageHeightCm: string;
  packageWeightKg: string;
  packageWidthCm: string;
  price: string;
};

const emptyForm: ShippingFormState = {
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
    (gateway) => gateway.airports
  ),
  ...[
    ...flightDestinationCatalog.destinations.africa,
    ...flightDestinationCatalog.destinations.antilles,
  ].flatMap((destination) => destination.airports),
];

const SenderFormular = () => {
  const { isRestricted } = useAccountRestrictions();
  const [form, setForm] = useState<ShippingFormState>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'error' | 'success' | 'idle'>('idle');
  const isFormComplete = isShippingFormComplete(form);

  const handleChange =
    (name: keyof ShippingFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((currentForm) => ({
        ...currentForm,
        [name]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setStatus('idle');

    try {
      await createAnnouncement({
        type: 'shipping',
        description: form.description,
        departingFrom: form.departingFrom,
        arrivingAt: form.arrivingAt,
        packageWeightKg: toNumber(form.packageWeightKg),
        packageHeightCm: toNumber(form.packageHeightCm),
        packageWidthCm: toNumber(form.packageWidthCm),
        packageDepthCm: toNumber(form.packageDepthCm),
        packageContentDescription: form.packageContentDescription.trim(),
        price: toNumber(form.price),
      });
      setForm(emptyForm);
      setStatus('success');
      setMessage('Annonce colis créée en brouillon.');
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

        <FormCard onSubmit={handleSubmit}>
          <SectionTitle>Trajet</SectionTitle>
          <FieldsGrid>
            <Field>
              <RequiredLabel>Départ</RequiredLabel>
              <input
                list="shipping-departure-airports"
                value={form.departingFrom}
                onChange={handleChange('departingFrom')}
                placeholder="Paris-Orly"
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Arrivée</RequiredLabel>
              <input
                list="shipping-arrival-airports"
                value={form.arrivingAt}
                onChange={handleChange('arrivingAt')}
                placeholder="Aéroport Martinique Aimé Césaire"
                required
              />
            </Field>
          </FieldsGrid>

          <SectionTitle>Colis</SectionTitle>
          <Field>
            <RequiredLabel>Description de l’annonce</RequiredLabel>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Je souhaite envoyer un colis vers Fort-de-France"
              required
            />
          </Field>
          <Field>
            <RequiredLabel>Contenu du colis</RequiredLabel>
            <textarea
              value={form.packageContentDescription}
              onChange={handleChange('packageContentDescription')}
              placeholder="Documents administratifs, vêtements, petit matériel..."
              required
            />
          </Field>
          <FieldsGrid>
            <Field>
              <RequiredLabel>Poids colis (kg)</RequiredLabel>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={form.packageWeightKg}
                onChange={handleChange('packageWeightKg')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Hauteur (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                value={form.packageHeightCm}
                onChange={handleChange('packageHeightCm')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Largeur (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                value={form.packageWidthCm}
                onChange={handleChange('packageWidthCm')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Profondeur (cm)</RequiredLabel>
              <input
                type="number"
                min="1"
                step="1"
                value={form.packageDepthCm}
                onChange={handleChange('packageDepthCm')}
                required
              />
            </Field>
            <Field>
              <RequiredLabel>Prix proposé (€)</RequiredLabel>
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

const toNumber = (value: string) => Number(value.replace(',', '.'));

const isShippingFormComplete = (form: ShippingFormState) =>
  [
    form.departingFrom,
    form.arrivingAt,
    form.description,
    form.packageContentDescription,
  ].every((value) => value.trim().length > 0) &&
  hasPositiveNumber(form.packageWeightKg) &&
  hasPositiveNumber(form.packageHeightCm) &&
  hasPositiveNumber(form.packageWidthCm) &&
  hasPositiveNumber(form.packageDepthCm) &&
  hasPositiveNumber(form.price);

const hasPositiveNumber = (value: string) => {
  const parsedValue = toNumber(value);

  return Number.isFinite(parsedValue) && parsedValue > 0;
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

export default SenderFormular;
