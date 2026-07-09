import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginMember } from './API/apiManager';
import LogoChayeSection from './LogoChayeSection';
import SignInOrUpBy from './SignInOrUpBy';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('codex@chaye.test');
  const [password, setPassword] = useState('ChayeDemo2026!');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await loginMember(email, password);
      navigate('/announcements');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Connexion impossible.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <LogoChayeSection />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header>
              <h4 className="auth-subtitle">Connectez-vous à votre compte</h4>
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

              <div className="form-link auth-options-row">
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
                  <button type="button" className="forgot-pass">
                    Mot de passe oublié
                  </button>
                </div>
              </div>

              {message ? (
                <p className="form-submit-message error" role="status">
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
                <Link to="/register" className="link signup-link">
                  Créer votre compte
                </Link>
              </span>
            </div>
          </div>
          <SignInOrUpBy />
        </div>
      </section>
    </div>
  );
};

export default Login;
