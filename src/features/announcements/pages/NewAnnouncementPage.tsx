import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FormError from '../../../components/FormError';
import Header from '../../../components/Header';
import apiClient, { normalizeApiError } from '../../../lib/api-client';
import {
  announcementFormSchema,
  createAnnouncementPayloadSchema,
} from '../announcement.schemas';
import type {
  AnnouncementFormOutput,
  AnnouncementFormValues,
} from '../announcement.schemas';

function NewAnnouncementPage() {
  const navigate = useNavigate();
  const form = useForm<AnnouncementFormValues, unknown, AnnouncementFormOutput>(
    {
      resolver: zodResolver(announcementFormSchema),
      defaultValues: {
        departingFrom: '',
        arrivingAt: '',
        description: '',
        weightAvailability: '',
        price: '',
      },
    }
  );

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors('root');
    try {
      const payload = createAnnouncementPayloadSchema.parse({
        ...values,
        type: 'shipping',
      });
      await apiClient.post('/announcements', payload);
      navigate('/announcements');
    } catch (error) {
      form.setError('root.server', {
        message: normalizeApiError(error).message,
      });
    }
  });

  return (
    <div className="content">
      <div className="content-body">
        <Header />
        <form
          aria-label="Formulaire de création d’annonce"
          data-testid="announcement-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="container">
            <div
              className="box-chaye margin-top-25 bgPurple"
              style={{ position: 'relative' }}
            >
              <h2 className="txtCenter margin-top-36 txtwhite margin-bottom-40">
                J’expédie un colis
              </h2>
              <div className="displayFlex">
                <div className="container">
                  <div className="DisplayVol">
                    <AnnouncementField
                      form={form}
                      name="departingFrom"
                      label="Départ de"
                      placeholder="Fort de France"
                      list="departure-options"
                    />
                    <datalist id="departure-options">
                      <option value="Fort de France" />
                      <option value="San Francisco" />
                      <option value="New York" />
                      <option value="Seattle" />
                      <option value="Los Angeles" />
                      <option value="Chicago" />
                    </datalist>
                    <AnnouncementField
                      form={form}
                      name="arrivingAt"
                      label="Arrivée à"
                      placeholder="Paris"
                      list="arrival-options"
                    />
                    <datalist id="arrival-options">
                      <option value="Paris" />
                      <option value="Fort de France" />
                      <option value="San Francisco" />
                      <option value="New York" />
                      <option value="Seattle" />
                      <option value="Los Angeles" />
                    </datalist>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="section gray-bg" id="blog">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="blog-grid">
                    <div className="blog-info mt-n2">
                      <FormError
                        message={form.formState.errors.root?.server?.message}
                      />
                      <AnnouncementField
                        form={form}
                        name="description"
                        label="Description"
                        placeholder="Description"
                      />
                      <AnnouncementField
                        form={form}
                        name="weightAvailability"
                        label="Poids disponible en kg"
                        placeholder="Kg disponible *"
                        type="number"
                      />
                      <AnnouncementField
                        form={form}
                        name="price"
                        label="Prix au kilo"
                        placeholder="Prix au kilo"
                        type="number"
                      />
                      <div className="container content mt-2">
                        <div className="row align-items-center content">
                          <div className="col-12 text-center">
                            <button
                              type="submit"
                              disabled={form.formState.isSubmitting}
                              className="btn btn-secondary px-4 py-3"
                            >
                              {form.formState.isSubmitting
                                ? 'Publication…'
                                : 'Publier votre annonce'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

type AnnouncementFieldName =
  | 'departingFrom'
  | 'arrivingAt'
  | 'description'
  | 'weightAvailability'
  | 'price';

type AnnouncementFieldProps = {
  form: ReturnType<
    typeof useForm<AnnouncementFormValues, unknown, AnnouncementFormOutput>
  >;
  name: AnnouncementFieldName;
  label: string;
  placeholder: string;
  type?: string;
  list?: string;
};

function AnnouncementField({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  list,
}: AnnouncementFieldProps) {
  const error = form.formState.errors[name]?.message;
  const id = `announcement-${name}`;

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="form-control"
        type={type}
        list={list}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...form.register(name)}
      />
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}

export default NewAnnouncementPage;
