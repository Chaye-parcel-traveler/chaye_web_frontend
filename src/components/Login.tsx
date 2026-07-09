import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginMember } from './API/apiManager';
import LogoChayeSection from './LogoChayeSection';
import SignInOrUpBy from './SignInOrUpBy';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('codex@chaye.test');
  const [password, setPassword] = useState('ChayeDemo2026!');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'error' | 'idle'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await loginMember(email, password);
      navigate('/annonces');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Connexion impossible.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LogoChayeSection />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header>
              <h4
                style={{
                  fontSize: '17px!important',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Connectez-vous à votre compte
              </h4>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div
                className="form-link"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked
                    readOnly
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
                <button className="btnValider" disabled={isSubmitting}>
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
    </>
  );
};

export default Login;
