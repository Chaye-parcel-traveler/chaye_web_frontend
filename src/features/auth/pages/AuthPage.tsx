import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import FormError from '../../../components/FormError';
import apiClient, {
  getApiUrl,
  normalizeApiError,
  persistAuthToken,
} from '../../../lib/api-client';
import type { Member } from '../../members/member.types';
import { login } from '../api/auth.api';
import {
  createMemberPayloadSchema,
  loginSchema,
  signupSchema,
} from '../auth.schemas';
import type { LoginValues, SignupValues } from '../auth.schemas';
import './AuthPage.css';

function AuthPage() {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const signupForm = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      address: '',
      phone: '',
      birthDate: '',
      email: '',
      password: '',
    },
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: getApiUrl('/auth/google/redirect'),
    ux_mode: 'redirect',
    onSuccess: async (codeResponse) => {
      const qs = new URLSearchParams({
        code: codeResponse.code,
        scope: codeResponse.scope,
      });
      await apiClient.get(`/auth/google/callback?${qs}`);
    },
    onError: () => {},
  });

  const handleLogin = loginForm.handleSubmit(async (values) => {
    loginForm.clearErrors('root');
    try {
      const response = await login(loginSchema.parse(values));
      persistAuthToken(response.value);
      await apiClient.get<Member>('/me');
      navigate('/');
    } catch (error) {
      loginForm.setError('root.server', {
        message: normalizeApiError(error).message,
      });
    }
  });

  const handleSignup = signupForm.handleSubmit(async (values) => {
    signupForm.clearErrors('root');
    const payloadResult = createMemberPayloadSchema.safeParse({
      ...values,
      acceptedCguVersion: import.meta.env.VITE_CURRENT_CGU_VERSION ?? '',
    });

    if (!payloadResult.success) {
      signupForm.setError('root.server', {
        message: payloadResult.error.issues[0]?.message,
      });
      return;
    }

    try {
      await apiClient.post('/members', payloadResult.data);
      signupForm.reset();
      setShowSignUp(false);
    } catch (error) {
      signupForm.setError('root.server', {
        message: normalizeApiError(error).message,
      });
    }
  });

  const toggleSignup = () => {
    loginForm.clearErrors();
    signupForm.clearErrors();
    setShowSignUp((visible) => !visible);
  };

  return (
    <div className="page-login">
      <section className="logoChaye">
        <Link to="/">
          <img src="images/logoChaye.png" alt="Chaye" />
        </Link>
      </section>
      <section className="container container-login forms">
        <div className={`form login ${showSignUp ? 'd-none' : ''}`}>
          <div className="form-content">
            <header>
              <h2>Content de te revoir</h2>
              <h4>Connectez-vous à votre compte</h4>
            </header>
            <form aria-label="Formulaire de connexion" onSubmit={handleLogin}>
              <FormError
                message={loginForm.formState.errors.root?.server?.message}
              />
              <div className="field input-field">
                <label className="visually-hidden" htmlFor="login-email">
                  Adresse e-mail de connexion
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  className="input"
                  aria-invalid={Boolean(loginForm.formState.errors.email)}
                  aria-describedby={
                    loginForm.formState.errors.email
                      ? 'login-email-error'
                      : undefined
                  }
                  {...loginForm.register('email')}
                />
                <FormError
                  id="login-email-error"
                  message={loginForm.formState.errors.email?.message}
                />
              </div>
              <div className="field input-field">
                <label className="visually-hidden" htmlFor="login-password">
                  Mot de passe de connexion
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Mot de passe"
                  className="password"
                  aria-invalid={Boolean(loginForm.formState.errors.password)}
                  aria-describedby={
                    loginForm.formState.errors.password
                      ? 'login-password-error'
                      : undefined
                  }
                  {...loginForm.register('password')}
                />
                <FormError
                  id="login-password-error"
                  message={loginForm.formState.errors.password?.message}
                />
              </div>
              <div
                className="form-link"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <label>
                  <input type="checkbox" defaultChecked />{' '}
                  <span className="serappeller">Se rappeler de moi</span>
                </label>
                <button type="button" className="forgot-pass">
                  Mot de passe oublié
                </button>
              </div>
              <div className="field button-field">
                <button
                  className="btnValider"
                  disabled={loginForm.formState.isSubmitting}
                  type="submit"
                >
                  {loginForm.formState.isSubmitting ? 'Connexion…' : 'Valider'}
                </button>
              </div>
            </form>
            <div className="form-link">
              <span>
                Vous n’avez pas de compte ?{' '}
                <button
                  type="button"
                  onClick={toggleSignup}
                  className="link signup-link"
                >
                  Créer votre compte
                </button>
              </span>
            </div>
          </div>
          <SocialLogin googleLogin={googleLogin} />
        </div>

        <div className={`form signup ${showSignUp ? '' : 'd-none'}`}>
          <div className="form-content">
            <header>
              <h2>S’enregistrer</h2>
              <h4>Créez votre nouveau compte</h4>
            </header>
            <form aria-label="Formulaire d’inscription" onSubmit={handleSignup}>
              <FormError
                message={signupForm.formState.errors.root?.server?.message}
              />
              <SignupField
                form={signupForm}
                name="firstname"
                label="Prénom"
                autoComplete="given-name"
              />
              <SignupField
                form={signupForm}
                name="lastname"
                label="Nom"
                autoComplete="family-name"
              />
              <SignupField
                form={signupForm}
                name="address"
                label="Adresse"
                autoComplete="street-address"
              />
              <SignupField
                form={signupForm}
                name="phone"
                label="Téléphone"
                type="tel"
                autoComplete="tel"
              />
              <SignupField
                form={signupForm}
                name="birthDate"
                label="Date de naissance"
                type="date"
                autoComplete="bday"
              />
              <SignupField
                form={signupForm}
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
              />
              <SignupField
                form={signupForm}
                name="password"
                label="Créer votre mot de passe"
                type="password"
                autoComplete="new-password"
              />
              <div className="form-link">
                <label htmlFor="accepts-cgu">
                  <input
                    id="accepts-cgu"
                    type="checkbox"
                    aria-invalid={Boolean(
                      signupForm.formState.errors.acceptsCgu
                    )}
                    aria-describedby={
                      signupForm.formState.errors.acceptsCgu
                        ? 'accepts-cgu-error'
                        : undefined
                    }
                    {...signupForm.register('acceptsCgu')}
                  />{' '}
                  J’accepte les conditions générales
                </label>
                <FormError
                  id="accepts-cgu-error"
                  message={signupForm.formState.errors.acceptsCgu?.message}
                />
              </div>
              <div className="field button-field">
                <button
                  className="btnValider"
                  disabled={signupForm.formState.isSubmitting}
                  type="submit"
                >
                  {signupForm.formState.isSubmitting
                    ? 'Inscription…'
                    : 'Valider'}
                </button>
              </div>
            </form>
            <div className="form-link">
              <span>
                Vous avez déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={toggleSignup}
                  className="link login-link"
                >
                  Se connecter
                </button>
              </span>
            </div>
          </div>
          <SocialLogin googleLogin={googleLogin} />
        </div>
      </section>
    </div>
  );
}

type SignupFieldProps = {
  form: ReturnType<typeof useForm<SignupValues>>;
  name:
    | 'firstname'
    | 'lastname'
    | 'address'
    | 'phone'
    | 'birthDate'
    | 'email'
    | 'password';
  label: string;
  type?: string;
  autoComplete: string;
};

function SignupField({
  form,
  name,
  label,
  type = 'text',
  autoComplete,
}: SignupFieldProps) {
  const error = form.formState.errors[name]?.message;
  const errorId = `signup-${name}-error`;

  return (
    <div className="field input-field">
      <label className="visually-hidden" htmlFor={`signup-${name}`}>
        {label}
      </label>
      <input
        id={`signup-${name}`}
        type={type}
        autoComplete={autoComplete}
        placeholder={label}
        className="input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...form.register(name)}
      />
      <FormError id={errorId} message={error} />
    </div>
  );
}

function SocialLogin({ googleLogin }: { googleLogin: () => void }) {
  return (
    <>
      <div className="line"></div>
      <div className="media-options">
        <button type="button" className="field facebook">
          <i className="bx bxl-facebook facebook-icon"></i>
          <span>Se connecter avec Facebook</span>
        </button>
      </div>
      <div className="media-options">
        <button type="button" onClick={googleLogin} className="field google">
          <img src="images/google.png" alt="" className="google-img" />
          <span>Se connecter avec Google</span>
        </button>
      </div>
      <div className="media-options">
        <button type="button" className="field apple">
          <i className="bx bxl-apple apple-icon"></i>
          <span>Se connecter avec Apple</span>
        </button>
      </div>
    </>
  );
}

export default AuthPage;
