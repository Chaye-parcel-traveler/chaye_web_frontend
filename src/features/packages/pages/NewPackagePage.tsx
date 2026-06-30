import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import FormError from '../../../components/FormError';
import Header from '../../../components/Header';
import { newPackageSchema } from '../package.schemas';
import type { NewPackageOutput, NewPackageValues } from '../package.schemas';

function NewPackagePage() {
  const form = useForm<NewPackageValues, unknown, NewPackageOutput>({
    resolver: zodResolver(newPackageSchema),
    defaultValues: {
      departingFrom: '',
      arrivingAt: '',
      description: '',
      weight: '',
      length: '',
      width: '',
      depth: '',
      price: '',
      shippingLimitDate: '',
    },
  });

  const handleSubmit = form.handleSubmit(() => {
    form.setError('root.server', {
      message:
        "La création de colis n'est pas encore disponible dans l’API Chaye.",
    });
  });

  return (
    <div className="content">
      <div className="content-body">
        <Header />
        <form
          aria-label="Formulaire de création de colis"
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
                    <PackageField
                      form={form}
                      name="departingFrom"
                      label="Départ de"
                      placeholder="Fort de France"
                    />
                    <PackageField
                      form={form}
                      name="arrivingAt"
                      label="Arrivée à"
                      placeholder="Paris"
                    />
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
                      <PackageField
                        form={form}
                        name="description"
                        label="Contenu du colis"
                        placeholder="Contenu du colis*"
                      />
                      <PackageField
                        form={form}
                        name="weight"
                        label="Poids du colis en kg"
                        placeholder="Poids du colis en Kg *"
                        type="number"
                      />
                      <PackageField
                        form={form}
                        name="length"
                        label="Longueur du colis"
                        placeholder="Longueur du colis*"
                        type="number"
                      />
                      <PackageField
                        form={form}
                        name="width"
                        label="Largeur du colis"
                        placeholder="Largeur du colis*"
                        type="number"
                      />
                      <PackageField
                        form={form}
                        name="depth"
                        label="Profondeur du colis"
                        placeholder="Profondeur du colis*"
                        type="number"
                      />
                      <PackageField
                        form={form}
                        name="price"
                        label="Prix proposé"
                        placeholder="Prix proposé*"
                        type="number"
                      />
                      <PackageField
                        form={form}
                        name="shippingLimitDate"
                        label="Date limite d’expédition"
                        placeholder=""
                        type="date"
                      />
                      <div className="container content mt-2">
                        <div className="row align-items-center content">
                          <div className="col-12 text-center">
                            <button
                              type="submit"
                              disabled={form.formState.isSubmitting}
                              className="btn btn-secondary px-4 py-3"
                            >
                              Publier votre colis
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

type PackageFieldName = keyof NewPackageValues;
type PackageForm = ReturnType<
  typeof useForm<NewPackageValues, unknown, NewPackageOutput>
>;

function PackageField({
  form,
  name,
  label,
  placeholder,
  type = 'text',
}: {
  form: PackageForm;
  name: PackageFieldName;
  label: string;
  placeholder: string;
  type?: string;
}) {
  const error = form.formState.errors[name]?.message;
  const id = `package-${name}`;

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="form-control"
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...form.register(name)}
      />
      <FormError id={`${id}-error`} message={error} />
    </div>
  );
}

export default NewPackagePage;
