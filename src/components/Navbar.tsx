import { useState, useEffect } from 'react';
import { logout } from '../features/auth/api/auth.api';
import { Link } from 'react-router-dom';
import apiClient, { clearAuthToken } from '../lib/api-client';
import type { Member } from '../features/members/member.types';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Member | null>(null);
  const [sideBarClose, setSideBarClose] = useState(true);

  useEffect(() => {
    apiClient
      .get<Member>('/me')
      .then((response) => {
        setUserData(response.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUserData(null);
      });
  }, []);
  const handleSearch = () => {
    // Vous pouvez ajouter ici la logique de recherche en fonction de la valeur de e.target.value
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearAuthToken();
      setUserData(null);
      setIsLoggedIn(false);
    }
  };

  const toggleSidebar = () => {
    setSideBarClose(!sideBarClose);
  };

  return (
    <nav className={`sidebar ${sideBarClose ? 'close' : null}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <Link to="/">
              <img src="images/logo.png" alt="Chaye" />
            </Link>
          </span>

          <div className="text logo-text">
            <span className="name">Chaye</span>
            {/*<span className="profession">New Edge</span>*/}
          </div>
        </div>

        <button
          type="button"
          className="bx bx-chevron-right toggle"
          onClick={toggleSidebar}
          aria-label={sideBarClose ? 'Ouvrir le menu' : 'Fermer le menu'}
          aria-expanded={!sideBarClose}
        ></button>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li
            className="search-box"
            onClick={() => {
              setSideBarClose(false);
            }}
          >
            <i className="bx bx-search icon"></i>
            <input
              type="text"
              placeholder="Rechercher..."
              onChange={handleSearch}
            />
          </li>

          <ul className="menu-links">
            <li className="menu-item">
              <Link to={'/announcements'}>
                <i className="bx bx-tada-hover bxs-widget bx-md icon"></i>
                <span className="text nav-text">Annonces</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link
                to={
                  isLoggedIn && userData ? `/members/${userData.id}` : '/auth'
                }
              >
                <i className="bx bx-tada-hover bxs-user-detail bx-md icon"></i>
                <span className="text nav-text">Mon compte</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to={'/support'}>
                <i className="bx bx-tada-hover bxs-help-circle bx-md icon"></i>
                <span className="text nav-text">Support</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to={'/about'}>
                <i className="bx bx-tada-hover bxs-info-circle bx-md icon"></i>
                <span className="text nav-text">À propos de nous </span>
              </Link>
            </li>

            <li className="menu-item">
              <span
                className="nav-item-content"
                aria-disabled="true"
                aria-label="Mes messages, bientôt disponible"
              >
                <i className="bx bxs-bell bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Mes messages</span>
              </span>
            </li>

            <li className="menu-item">
              <span
                className="nav-item-content"
                aria-disabled="true"
                aria-label="Portefeuille, bientôt disponible"
              >
                <i className="bx bxs-wallet bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Portefeuille</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          {isLoggedIn && (
            <li onClick={handleLogout}>
              <i className="bx bx-log-out bx-tada-hover bx-md icon"></i>
              <span className="text nav-text pointer">Se deconnecter</span>
            </li>
          )}
          {/* <li className="mode">
                <div className="sun-moon">
                  <i className="bx bx-moon icon moon"></i>
                  <i className="bx bx-sun icon sun"></i>
                </div>
                <span className="mode-text text">Dark mode</span>
    
                <div className="toggle-switch">
                  <span className="switch"></span>
                </div>
              </li>*/}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
