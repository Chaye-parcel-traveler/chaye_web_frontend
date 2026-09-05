import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FormError from '../../../components/FormError';
import {
  packageDraftSchema,
  type PackageDraftFormInput,
  type PackageDraftFormOutput,
} from '../package.schemas';

const defaultValues: PackageDraftFormInput = {
  arrivingAt: '',
  departingFrom: '',
  description: '',
  packageDepthCm: '',
  packageHeightCm: '',
  packageWeightKg: '',
  packageWidthCm: '',
  price: '',
  shippingLimitDate: '',
};

function NewPackagePage() {
  const [submitMessage, setSubmitMessage] = useState('');
  const form = useForm<PackageDraftFormInput, unknown, PackageDraftFormOutput>({
    defaultValues,
    resolver: zodResolver(packageDraftSchema),
  });

  const handleSubmit = form.handleSubmit(() => {
    setSubmitMessage(
      "La création de colis isolée n'est pas exposée par l'API actuelle. Utilisez le formulaire expéditeur, qui publie une annonce de type shipping.",
    );
  });

  return (
    <Page className="container">
      <Header>
        <div>
          <p>Colis</p>
          <h1>Préparer un colis</h1>
        </div>
        <Link to="/sender">Formulaire expéditeur</Link>
      </Header>

      <FormPanel
        aria-label="Formulaire de préparation de colis"
        noValidate
        onSubmit={handleSubmit}
      >
        <FormError message={submitMessage} />

        <Grid>
          <PackageField
            form={form}
            label="Départ"
            name="departingFrom"
            placeholder="Bordeaux"
          />
          <PackageField
            form={form}
            label="Arrivée"
            name="arrivingAt"
            placeholder="Pointe-à-Pitre"
          />
          <PackageField
            form={form}
            label="Poids"
            name="packageWeightKg"
            placeholder="3.5"
            suffix="kg"
          />
          <PackageField
            form={form}
            label="Hauteur"
            name="packageHeightCm"
            placeholder="30"
            suffix="cm"
          />
          <PackageField
            form={form}
            label="Largeur"
            name="packageWidthCm"
            placeholder="20"
            suffix="cm"
          />
          <PackageField
            form={form}
            label="Profondeur"
            name="packageDepthCm"
            placeholder="10"
            suffix="cm"
          />
          <PackageField
            form={form}
            label="Prix proposé"
            name="price"
            placeholder="15"
            suffix="EUR"
          />
          <PackageField
            form={form}
            label="Date limite"
            name="shippingLimitDate"
            type="date"
          />
        </Grid>

        <TextAreaField form={form} />

        <Actions>
          <Link to="/annonces">Voir les annonces</Link>
          <button disabled={!form.formState.isValid} type="submit">
            Vérifier le colis
          </button>
        </Actions>
      </FormPanel>
    </Page>
  );
}

type PackageFieldName = keyof PackageDraftFormInput;
type PackageForm = ReturnType<
  typeof useForm<PackageDraftFormInput, unknown, PackageDraftFormOutput>
>;

function PackageField({
  form,
  label,
  name,
  placeholder,
  suffix,
  type = 'text',
}: {
  form: PackageForm;
  label: string;
  name: PackageFieldName;
  placeholder?: string;
  suffix?: string;
  type?: string;
}) {
  const id = `package-${name}`;
  const error = form.formState.errors[name]?.message;

  return (
    <Field>
      <label htmlFor={id}>* {label}</label>
      <InputRow>
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          id={id}
          placeholder={placeholder}
          type={type}
          {...form.register(name)}
        />
        {suffix && <span>{suffix}</span>}
      </InputRow>
      <FormError id={`${id}-error`} message={error} />
    </Field>
  );
}

function TextAreaField({ form }: { form: PackageForm }) {
  const id = 'package-description';
  const error = form.formState.errors.description?.message;

  return (
    <Field>
      <label htmlFor={id}>* Contenu du colis</label>
      <textarea
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={id}
        placeholder="Documents administratifs, livres, petit matériel..."
        rows={5}
        {...form.register('description')}
      />
      <FormError id={`${id}-error`} message={error} />
    </Field>
  );
}

const Page = styled.main`
  padding: 48px 0 80px;
`;

const Header = styled.header`
  align-items: center;
  background: #5a4aa3;
  border-radius: 8px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 28px 32px;

  p,
  h1 {
    margin: 0;
  }

  p {
    font-weight: 700;
    margin-bottom: 8px;
  }

  a {
    background: #ee5d4f;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
    padding: 12px 18px;
    text-decoration: none;
  }
`;

const FormPanel = styled.form`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 14px 35px rgb(47 43 58 / 8%);
  padding: 28px;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const Field = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 18px;

  label {
    font-weight: 700;
  }

  input,
  textarea {
    border: 1px solid #d8d4e7;
    border-radius: 8px;
    font: inherit;
    min-height: 46px;
    padding: 10px 12px;
    width: 100%;
  }
`;

const InputRow = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;

  span {
    color: #5a4aa3;
    font-weight: 700;
  }
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  justify-content: flex-end;

  a,
  button {
    border-radius: 8px;
    font: inherit;
    font-weight: 700;
    padding: 12px 18px;
  }

  a {
    color: #5a4aa3;
    text-decoration: none;
  }

  button {
    background: #ee5d4f;
    border: 0;
    color: #fff;
    cursor: pointer;
  }

  button:disabled {
    background: #c8c2d9;
    cursor: not-allowed;
  }
`;

export default NewPackagePage;
