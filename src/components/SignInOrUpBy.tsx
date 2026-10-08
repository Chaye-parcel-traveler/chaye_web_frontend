import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../lib/api-client';
import { CURRENT_CGU_VERSION } from '../features/auth/auth.constants';
import { useAuthSession } from '../features/auth/auth-session-context';

type SignInOrUpByProps = {
  mode?: 'login' | 'register';
};

const getGoogleOAuthUrl = (acceptedCguVersion?: string) => {
  const query = acceptedCguVersion
    ? `?acceptedCguVersion=${encodeURIComponent(acceptedCguVersion)}`
    : '';

  return getApiUrl(`/auth/google/redirect${query}`);
};

const oauthMessages: Record<string, string> = {
  access_denied: 'Connexion Google annulée.',
  cgu_acceptance_required:
    'Vous devez accepter les CGU pour finaliser la connexion Google.',
  email_unverified: "L'adresse email Google doit être vérifiée.",
  invalid_state: 'Session Google expirée. Réessayez.',
  provider_error: 'Google a refusé la connexion. Réessayez.',
};

const SignInOrUpBy = ({ mode = 'login' }: SignInOrUpByProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshSession } = useAuthSession();
  const [acceptedGoogleTerms, setAcceptedGoogleTerms] = useState(false);
  const [oauthMessage, setOauthMessage] = useState('');
  const [requiresGoogleTerms, setRequiresGoogleTerms] = useState(
    mode === 'register',
  );

  const googleOAuthUrl = requiresGoogleTerms
    ? getGoogleOAuthUrl(CURRENT_CGU_VERSION)
    : getGoogleOAuthUrl();

  useEffect(() => {
    const oauthStatus = searchParams.get('oauth');

    if (!oauthStatus) {
      return;
    }

    if (oauthStatus === 'success') {
      void refreshSession()
        .then((member) => {
          if (member) {
            navigate('/annonces', { replace: true });
            return;
          }

          setOauthMessage('Session Google introuvable. Réessayez.');
        })
        .catch(() => {
          setOauthMessage(
            'Impossible de vérifier la session Google pour le moment. Réessayez.',
          );
        });
      return;
    }

    if (oauthStatus === 'cgu_acceptance_required') {
      setRequiresGoogleTerms(true);
    }

    setOauthMessage(
      oauthMessages[oauthStatus] ?? 'Connexion Google impossible.',
    );
  }, [navigate, refreshSession, searchParams]);

  return (
    <>
      <div className="line"></div>

      <div className="media-options">
        <button type="button" className="field facebook" disabled>
          <i className="bx bxl-facebook facebook-icon"></i>
          <span>Se connecter avec Facebook</span>
        </button>
      </div>

      <div className="media-options">
        {requiresGoogleTerms && !acceptedGoogleTerms ? (
          <button
            type="button"
            className="field google"
            onClick={() => {
              setOauthMessage(
                'Vous devez accepter explicitement les CGU avant Google.',
              );
            }}
          >
            <img src="/images/google.png" alt="" className="google-img" />
            <span>Se connecter avec Google</span>
          </button>
        ) : (
          <a href={googleOAuthUrl} className="field google">
            <img src="/images/google.png" alt="" className="google-img" />
            <span>Se connecter avec Google</span>
          </a>
        )}
      </div>

      {requiresGoogleTerms ? (
        <label className="google-terms-field">
          <input
            type="checkbox"
            checked={acceptedGoogleTerms}
            onChange={(event) => {
              setAcceptedGoogleTerms(event.target.checked);
              if (event.target.checked) {
                setOauthMessage('');
              }
            }}
          />
          <span>
            J’accepte les conditions générales d’utilisation de Chayé.
          </span>
        </label>
      ) : null}

      <div className="media-options">
        <button type="button" className="field apple" disabled>
          <i className="bx bxl-apple apple-icon"></i>
          <span>Se connecter avec Apple</span>
        </button>
      </div>

      {oauthMessage ? (
        <p className="form-submit-message error" role="alert">
          {oauthMessage}
        </p>
      ) : null}

      <div className="form-link">
        <span>
          <Link to="/legal-notice" className="link">
            Mentions légales
          </Link>
          {' | '}
          <Link to="/privacy-policy" className="link">
            Politique de confidentialité
          </Link>
        </span>
      </div>
    </>
  );
};

export default SignInOrUpBy;
