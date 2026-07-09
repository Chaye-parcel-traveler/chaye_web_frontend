import { FormEvent, useMemo, useState } from 'react';
import SignInOrUpBy from './SignInOrUpBy';
import './registerEnhancements.css';
import LogoChayeSection from './LogoChayeSection';
import {
  createReport,
  getAge,
  isMinorFromBirthDate,
  registerMember,
} from './API/apiManager';

type RegisterForm = {
  firstname: string;
  lastname: string;
  birthDate: string;
  country: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  termsAccepted: boolean;
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const CGU_VERSION = 'cgu-v1';

const initialForm: RegisterForm = {
  firstname: '',
  lastname: '',
  birthDate: '',
  country: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  termsAccepted: false,
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');

  const age = useMemo(() => getAge(form.birthDate), [form.birthDate]);
  const isMinor = isMinorFromBirthDate(form.birthDate);

  const updateField = <Key extends keyof RegisterForm>(
    key: Key,
    value: RegisterForm[Key]
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!form.termsAccepted) {
      setStatus('error');
      setMessage('Vous devez accepter les CGU pour créer un compte.');
      return;
    }

    if (form.password !== form.passwordConfirmation) {
      setStatus('error');
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    if (isMinor) {
      await createReport({
        targetType: 'registration',
        reason: 'Tentative inscription mineur',
        reporterEmail: form.email,
        description: `Date de naissance: ${form.birthDate}. Pays: ${form.country}.`,
      }).catch(() => undefined);

      setStatus('error');
      setMessage(
        "Vous devez avoir au moins 18 ans pour utiliser Chayé. Cette tentative d'inscription a été signalée à notre équipe."
      );
      return;
    }

    try {
      await registerMember({
        firstname: form.firstname,
        lastname: form.lastname,
        birthDate: form.birthDate,
        country: form.country,
        email: form.email,
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
        termsAccepted: form.termsAccepted,
        termsVersion: CGU_VERSION,
        isMinor,
      });
      setStatus('success');
      setMessage('Compte créé. Vous pouvez maintenant vous connecter.');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible de créer le compte pour l'instant."
      );
    }
  };

  return (
    <div className="auth-page">
      <LogoChayeSection />
      <section className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header>
              <h2>S’enregistrer</h2>
              <h4 className="auth-subtitle">Créez votre nouveau compte</h4>
            </header>
            <form onSubmit={submitRegister}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Prénom"
                  className="input"
                  value={form.firstname}
                  onChange={(event) =>
                    updateField('firstname', event.target.value)
                  }
                  required
                />
              </div>

              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Nom"
                  className="input"
                  value={form.lastname}
                  onChange={(event) =>
                    updateField('lastname', event.target.value)
                  }
                  required
                />
              </div>

              <div className="field input-field">
                <input
                  type="date"
                  aria-label="Date de naissance"
                  placeholder="Date de naissance"
                  className="input"
                  value={form.birthDate}
                  onChange={(event) =>
                    updateField('birthDate', event.target.value)
                  }
                  required
                />
              </div>

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
                  value={form.country}
                  onChange={(event) =>
                    updateField('country', event.target.value)
                  }
                  required
                />
              </div>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  required
                />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Créer votre mot de passe"
                  className="password"
                  value={form.password}
                  onChange={(event) =>
                    updateField('password', event.target.value)
                  }
                  required
                />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Confirmer votre mot de passe"
                  className="password"
                  value={form.passwordConfirmation}
                  onChange={(event) =>
                    updateField('passwordConfirmation', event.target.value)
                  }
                  required
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <label className="terms-field">
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(event) =>
                    updateField('termsAccepted', event.target.checked)
                  }
                />
                <span>
                  J’accepte les conditions générales d’utilisation de Chayé.
                </span>
              </label>

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
                <button className="btnValider" disabled={status === 'loading'}>
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
    </div>
  );
};

export default Register;
