import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import FormError from '../../../components/FormError';
import apiClient, {
  getApiAssetUrl,
  normalizeApiError,
} from '../../../lib/api-client';
import { editPackageSchema } from '../package.schemas';
import type { EditPackageOutput, EditPackageValues } from '../package.schemas';
import type { Package } from '../package.types';
import './EditPackagePage.css';

function EditPackagePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const form = useForm<EditPackageValues, unknown, EditPackageOutput>({
    resolver: zodResolver(editPackageSchema),
    defaultValues: {
      content: '',
      weight: '',
      size: '',
      departureCity: '',
      picture: '',
      file: undefined,
    },
  });
  const picture = useWatch({ control: form.control, name: 'picture' });

  useEffect(() => {
    let active = true;
    apiClient
      .get<Package>(`/package/${id}`, { withCredentials: true })
      .then((response) => {
        if (!active) {
          return;
        }
        form.reset({
          content: response.data.content ?? '',
          weight: String(response.data.weight ?? ''),
          size: String(response.data.size ?? ''),
          departureCity: response.data.departureCity ?? '',
          picture: response.data.picture ?? '',
          file: undefined,
        });
      })
      .catch((error) => {
        if (active) {
          form.setError('root.load', {
            message: normalizeApiError(error).message,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [form, id]);

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors('root');
    const formData = new FormData();
    if (values.file) {
      formData.append('file', values.file);
    }
    formData.append('content', values.content);
    formData.append('weight', String(values.weight));
    formData.append('size', values.size);
    formData.append('departureCity', values.departureCity);
    formData.append('picture', values.picture);

    try {
      await apiClient.put(`/editpackage/${id}`, formData);
      navigate('/');
    } catch (error) {
      form.setError('root.server', {
        message: normalizeApiError(error).message,
      });
    }
  });

  return (
    <div className="Formulcontainer">
      <h1>Modifier votre colis</h1>
      <form
        aria-label="Formulaire de modification de colis"
        className="col-formule bg-white container-fluid col-4 my-3"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormError
          message={
            form.formState.errors.root?.server?.message ??
            form.formState.errors.root?.load?.message
          }
        />
        <EditPackageField
          form={form}
          name="content"
          label="Contenu"
          type="text"
        />
        <EditPackageField
          form={form}
          name="weight"
          label="Poids"
          type="number"
        />
        <EditPackageField form={form} name="size" label="Taille" type="text" />
        <EditPackageField
          form={form}
          name="departureCity"
          label="Ville de départ"
          type="text"
        />
        <div className="mb-3">
          <label className="form-label" htmlFor="package-picture">
            Photo du contenu du colis
          </label>
          <input
            className="form-control"
            type="file"
            id="package-picture"
            accept="image/*"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              form.setValue('file', selectedFile, { shouldValidate: true });
              if (selectedFile) {
                form.setValue('picture', selectedFile.name);
              }
            }}
          />
          <FormError
            id="package-picture-error"
            message={form.formState.errors.file?.message}
          />
        </div>
        {picture && (
          <img
            src={getApiAssetUrl(picture)}
            width="150"
            alt="Contenu actuel du colis"
          />
        )}
        <button
          className="btn btn-primary"
          id="btn"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}

type EditPackageFieldName = 'content' | 'weight' | 'size' | 'departureCity';
type EditPackageForm = ReturnType<
  typeof useForm<EditPackageValues, unknown, EditPackageOutput>
>;

function EditPackageField({
  form,
  name,
  label,
  type,
}: {
  form: EditPackageForm;
  name: EditPackageFieldName;
  label: string;
  type: string;
}) {
  const error = form.formState.errors[name]?.message;
  const fieldId = `edit-package-${name}`;

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={fieldId}>
        {label}
      </label>
      <input
        className="form-control"
        type={type}
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...form.register(name)}
      />
      <FormError id={`${fieldId}-error`} message={error} />
    </div>
  );
}

export default EditPackagePage;
