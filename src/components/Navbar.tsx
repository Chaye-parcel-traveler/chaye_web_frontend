import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getStoredMember, logoutMember, onAuthChange } from './API/apiManager';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sideBarClose, setSideBarClose] = useState(true);
  const [memberName, setMemberName] = useState(() => {
    const member = getStoredMember();
    return member ? `${member.firstname} ${member.lastname}` : '';
  });

  useEffect(() => {
    const syncMember = () => {
      const member = getStoredMember();
      setMemberName(member ? `${member.firstname} ${member.lastname}` : '');
    };

    syncMember();
    return onAuthChange(syncMember);
  }, []);

  const handleAuthAction = () => {
    if (memberName) {
      logoutMember();
    }

    navigate('/login');
  };

  const toggleSidebar = () => {
    setSideBarClose(!sideBarClose);
  };

  return (
    <nav
      aria-label="Navigation principale"
      className={`sidebar ${sideBarClose ? 'close' : ''}`}
    >
      <header>
        <div className="image-text">
          <span className="image">
            <Link to="/" aria-label="Accueil Chaye" className="brand-logo">
              <img src="/images/logo.png" alt="Chaye" />
            </Link>
          </span>

          <div className="text logo-text">
            <span className="name">Chaye</span>
            {memberName ? (
              <span className="profession">{memberName}</span>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          className="bx bx-chevron-right toggle"
          onClick={toggleSidebar}
          aria-label={sideBarClose ? 'Ouvrir le menu' : 'Fermer le menu'}
          aria-expanded={!sideBarClose}
          aria-controls="primary-navigation"
        ></button>
      </header>

      <div className="menu-bar" id="primary-navigation">
        <div className="menu">
          <ul className="list-unstyled">
            <li className="search-box">
              <i className="bx bx-search icon" aria-hidden="true"></i>
              <label className="visually-hidden" htmlFor="navigation-search">
                Rechercher
              </label>
              <input
                id="navigation-search"
                type="search"
                placeholder="Rechercher..."
                onFocus={() => setSideBarClose(false)}
              />
            </li>
          </ul>

          <ul className="menu-links">
            <li className="nav-link menu-item">
              <Link aria-label="Annonces" to="/announcements">
                <i
                  className="bx bx-tada-hover bxs-widget bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">Annonces</span>
              </Link>
            </li>

            <li className="nav-link menu-item">
              <Link aria-label="Mon compte" to="/profil">
                <i
                  className="bx bx-tada-hover bxs-user-detail bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">Mon compte</span>
              </Link>
            </li>

            <li className="nav-link menu-item">
              <Link aria-label="Support" to="/support">
                <i
                  className="bx bx-tada-hover bxs-help-circle bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">Support</span>
              </Link>
            </li>

            <li className="nav-link menu-item">
              <Link aria-label="À propos de nous" to="/about">
                <i
                  className="bx bx-tada-hover bxs-info-circle bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">À propos de nous </span>
              </Link>
            </li>

            <li className="nav-link menu-item">
              <span
                className="nav-item-content"
                aria-disabled="true"
                aria-label="Mes messages, bientôt disponible"
              >
                <i
                  className="bx bxs-bell bx-tada-hover bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">Mes messages</span>
              </span>
            </li>

            <li className="nav-link menu-item">
              <span
                className="nav-item-content"
                aria-disabled="true"
                aria-label="Portefeuille, bientôt disponible"
              >
                <i
                  className="bx bxs-wallet bx-tada-hover bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">Portefeuille</span>
              </span>
            </li>

            <li className="nav-link menu-item">
              <Link aria-label="Admin" to="/admin">
                <i
                  className="bx bx-tada-hover bxs-shield bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">Admin</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          {location.pathname === '/login' && !memberName ? (
            <li className="nav-link menu-item">
              <Link aria-label="Créer un compte" to="/register">
                <i
                  className="bx bx-user-plus bx-tada-hover bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text">Créer un compte</span>
              </Link>
            </li>
          ) : (
            <li className="nav-link menu-item">
              <button
                type="button"
                className="logout-button"
                data-testid="auth-action-button"
                onClick={handleAuthAction}
              >
                <i
                  className="bx bx-log-out bx-tada-hover bx-md icon"
                  aria-hidden="true"
                ></i>
                <span className="text nav-text pointer">
                  {memberName ? 'Se déconnecter' : 'Se connecter'}
                </span>
              </button>
            </li>
          )}

          <li className="mode">
            <div className="sun-moon">
              <i className="bx bx-moon icon moon" aria-hidden="true"></i>
              <i className="bx bx-sun icon sun" aria-hidden="true"></i>
            </div>
            <span className="mode-text text">Dark mode</span>

            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
