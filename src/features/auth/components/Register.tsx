import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import SignInOrUpBy from '../../../components/SignInOrUpBy';
import './auth-form.css';
import './registerEnhancements.css';
import LogoChayeSection from '../../../components/LogoChayeSection';
import { getAge, isMinorFromBirthDate, registerMember } from '../api/auth.api';
import { registerSchema, type RegisterFormValues } from '../auth.schemas';
import { createReport } from '../../moderation/api/moderation.api';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const CGU_VERSION = '2026-06-01';

const initialForm: RegisterFormValues = {
  firstname: '',
  lastname: '',
  birthDate: '',
  country: '',
  address: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  termsAccepted: false,
};

const Register = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: initialForm,
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const birthDate = watch('birthDate');
  const age = useMemo(() => getAge(birthDate), [birthDate]);
  const isMinor = isMinorFromBirthDate(birthDate);

  const submitRegister = handleSubmit(async (values) => {
    setStatus('loading');
    setMessage('');

    if (isMinor) {
      await createReport({
        targetType: 'registration',
        reason: 'Tentative inscription mineur',
        reporterEmail: values.email,
        description: `Date de naissance: ${values.birthDate}. Pays: ${values.country}.`,
      }).catch(() => undefined);

      setStatus('error');
      setMessage(
        "Vous devez avoir au moins 18 ans pour utiliser Chayé. Cette tentative d'inscription a été signalée à notre équipe.",
      );
      return;
    }

    try {
      await registerMember({
        firstname: values.firstname,
        lastname: values.lastname,
        birthDate: values.birthDate,
        country: values.country,
        address: values.address,
        phone: values.phone,
        email: values.email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        termsAccepted: values.termsAccepted,
        termsVersion: CGU_VERSION,
        acceptedCguVersion: CGU_VERSION,
        isMinor,
      });
      setStatus('success');
      setMessage('Compte créé. Vous pouvez maintenant vous connecter.');
      reset(initialForm);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible de créer le compte pour l'instant.",
      );
    }
  });

  return (
    <main className="auth-page">
      <LogoChayeSection />
      <section className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header>
              {' '}
              <h2>S’enregistrer</h2>
              <h4
                style={{
                  fontSize: '17px!important',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Créez votre nouveau compte
              </h4>
            </header>
            <form onSubmit={submitRegister} noValidate>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Prénom"
                  className="input"
                  {...register('firstname')}
                  aria-invalid={Boolean(errors.firstname)}
                />
              </div>
              {errors.firstname ? (
                <p className="form-submit-message error">
                  {errors.firstname.message}
                </p>
              ) : null}

              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Nom"
                  className="input"
                  {...register('lastname')}
                  aria-invalid={Boolean(errors.lastname)}
                />
              </div>
              {errors.lastname ? (
                <p className="form-submit-message error">
                  {errors.lastname.message}
                </p>
              ) : null}

              <div className="field input-field">
                <input
                  type="date"
                  aria-label="Date de naissance"
                  placeholder="Date de naissance"
                  className="input"
                  {...register('birthDate')}
                  aria-invalid={Boolean(errors.birthDate)}
                />
              </div>
              {errors.birthDate ? (
                <p className="form-submit-message error">
                  {errors.birthDate.message}
                </p>
              ) : null}

              {age !== null && (
                <p
                  className={
                    isMinor ? 'form-alert error' : 'form-alert success'
                  }
                  role="status"
                >
                  {isMinor
                    ? "Vous devez avoir au moins 18 ans pour utiliser Chayé. L'inscription d'un mineur sera signalée."
                    : `Âge détecté : ${age} ans.`}
                </p>
              )}

              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Pays"
                  className="input"
                  {...register('country')}
                  aria-invalid={Boolean(errors.country)}
                />
              </div>
              {errors.country ? (
                <p className="form-submit-message error">
                  {errors.country.message}
                </p>
              ) : null}
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Adresse"
                  className="input"
                  {...register('address')}
                  aria-invalid={Boolean(errors.address)}
                />
              </div>
              {errors.address ? (
                <p className="form-submit-message error">
                  {errors.address.message}
                </p>
              ) : null}
              <div className="field input-field">
                <input
                  type="tel"
                  placeholder="Téléphone"
                  className="input"
                  {...register('phone')}
                  aria-invalid={Boolean(errors.phone)}
                />
              </div>
              {errors.phone ? (
                <p className="form-submit-message error">
                  {errors.phone.message}
                </p>
              ) : null}
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  {...register('email')}
                  aria-invalid={Boolean(errors.email)}
                />
              </div>
              {errors.email ? (
                <p className="form-submit-message error">
                  {errors.email.message}
                </p>
              ) : null}

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Créer votre mot de passe"
                  className="password"
                  {...register('password')}
                  aria-invalid={Boolean(errors.password)}
                />
              </div>
              {errors.password ? (
                <p className="form-submit-message error">
                  {errors.password.message}
                </p>
              ) : null}

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Confirmer votre mot de passe"
                  className="password"
                  {...register('passwordConfirmation')}
                  aria-invalid={Boolean(errors.passwordConfirmation)}
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              {errors.passwordConfirmation ? (
                <p className="form-submit-message error">
                  {errors.passwordConfirmation.message}
                </p>
              ) : null}

              <label className="terms-field">
                <input
                  type="checkbox"
                  {...register('termsAccepted')}
                  aria-invalid={Boolean(errors.termsAccepted)}
                />
                <span>
                  J’accepte les conditions générales d’utilisation de Chayé.
                </span>
              </label>
              {errors.termsAccepted ? (
                <p className="form-submit-message error">
                  {errors.termsAccepted.message}
                </p>
              ) : null}

              {message && (
                <p
                  className={
                    status === 'success'
                      ? 'form-submit-message success'
                      : 'form-submit-message error'
                  }
                  role="status"
                >
                  {message}
                </p>
              )}

              <div className="field button-field">
                <button
                  className="btnValider"
                  disabled={status === 'loading' || !isValid}
                >
                  {status === 'loading' ? 'Validation...' : 'Valider'}
                </button>
              </div>
            </form>

            <div className="form-link">
              <span>
                Vous avez déjà un compte ?{' '}
                <a href="/login" className="link login-link">
                  Se connecter
                </a>
              </span>
            </div>
          </div>
          <SignInOrUpBy />
        </div>
      </section>
    </main>
  );
};

export default Register;
