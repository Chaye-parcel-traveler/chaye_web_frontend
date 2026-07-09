import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getStoredMember, logoutMember, onAuthChange } from './API/apiManager';

const Navigation = () => {
  const sidebar = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [memberName, setMemberName] = useState(() => {
    const member = getStoredMember();
    return member ? `${member.firstname} ${member.lastname}` : '';
  });
  const toggle = () => sidebar.current?.classList.toggle('close');

  useEffect(() => {
    const syncMember = () => {
      const member = getStoredMember();
      setMemberName(member ? `${member.firstname} ${member.lastname}` : '');
    };

    syncMember();
    return onAuthChange(syncMember);
  }, []);

  const handleLogout = () => {
    logoutMember();
    navigate('/login');
  };

  return (
    <nav className="sidebar close" ref={sidebar}>
      <header>
        <div className="image-text">
          <span className="image">
            <Link to="/" aria-label="Accueil Chaye" className="brand-logo">
              <img src="images/logo.png" alt="Chaye" />
            </Link>
          </span>

          <div className="text logo-text">
            <span className="name">Chaye</span>
            {memberName ? (
              <span className="profession">{memberName}</span>
            ) : null}
          </div>
        </div>

        <i className="bx bx-chevron-right toggle" onClick={toggle}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className="bx bx-search icon" onClick={toggle}></i>
            <input type="text" placeholder="Rechercher..." />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/annonces">
                <i className="bx bx-tada-hover bxs-widget bx-md icon"></i>
                <span className="text nav-text">Annonces</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/profil">
                <i className="bx bx-tada-hover bxs-user-detail bx-md icon"></i>
                <span className="text nav-text">Mon compte</span>
              </Link>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-tada-hover bxs-help-circle bx-md icon"></i>
                <span className="text nav-text">Support</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-tada-hover bxs-info-circle bx-md icon"></i>
                <span className="text nav-text">À propos de nous</span>
              </a>
            </li>

            <li className="nav-link">
              <Link to="/profil/messages">
                <i className="bx bxs-bell bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Mes messages</span>
              </Link>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-wallet bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Portefeuille</span>
              </a>
            </li>

            <li className="nav-link">
              <Link to="/admin">
                <i className="bx bx-tada-hover bxs-shield bx-md icon"></i>
                <span className="text nav-text">Admin</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li>
            {location.pathname === '/login' && !memberName ? (
              <Link to="/register">
                <i className="bx bx-user-plus bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Créer un compte</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  alignItems: 'center',
                  background: 'transparent',
                  border: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <i className="bx bx-log-out bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">
                  {memberName ? 'Se déconnecter' : 'Se connecter'}
                </span>
              </button>
            )}
          </li>

          <li className="mode">
            <div className="sun-moon">
              <i className="bx bx-moon icon moon"></i>
              <i className="bx bx-sun icon sun"></i>
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
};

export default Navigation;
