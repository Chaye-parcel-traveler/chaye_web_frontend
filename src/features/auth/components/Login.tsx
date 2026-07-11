import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginMember } from '../api/auth.api';
import { loginSchema, type LoginFormValues } from '../auth.schemas';
import LogoChayeSection from '../../../components/LogoChayeSection';
import SignInOrUpBy from '../../../components/SignInOrUpBy';
import './auth-form.css';

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'error' | 'idle'>('idle');
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const submitLogin = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setMessage('');

    try {
      await loginMember(values.email, values.password);
      navigate('/annonces');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Connexion impossible.',
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <main className="auth-page">
      <LogoChayeSection />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header>
              <h4>Connectez-vous à votre compte</h4>
            </header>
            <form onSubmit={submitLogin} noValidate>
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
                  placeholder="Mot de passe"
                  className="password"
                  {...register('password')}
                  aria-invalid={Boolean(errors.password)}
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              {errors.password ? (
                <p className="form-submit-message error">
                  {errors.password.message}
                </p>
              ) : null}

              <div
                className="form-link"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    {...register('remember')}
                  />
                  <span className="serappeller">Se rappeler de moi</span>
                </div>
                <div>
                  <a href="#" className="forgot-pass">
                    Mot de passe oublié
                  </a>
                </div>
              </div>

              {message ? (
                <p
                  className={
                    status === 'error' ? 'form-submit-message error' : ''
                  }
                  style={{ marginTop: 14 }}
                >
                  {message}
                </p>
              ) : null}

              <div className="field button-field">
                <button
                  className="btnValider"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? 'Connexion...' : 'Valider'}
                </button>
              </div>
            </form>

            <div className="form-link">
              <span>
                Vous n’avez pas de compte ?
                <a href="/register" className="link signup-link">
                  Créer votre compte
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

export default Login;
