import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../Services/member'
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [sideBarClose, setSideBarClose] = useState(true);
  console.log('user', userData, isLoggedIn);

  useEffect(() => {
    axios.get('/me')
      .then(response => {
        setUserData(response.data);
        setIsLoggedIn(true);
      }).catch(error => {
        setUserData(false);
      });
  }, []);
  const handleSearch = (e) => {
    // Vous pouvez ajouter ici la logique de recherche en fonction de la valeur de e.target.value
  };

  const handleLogout = async (e) => {
    await logout();
    sessionStorage.clear();
    setUserData(null);
    setIsLoggedIn(false);
  }

  const toggleSidebar = () => {
    setSideBarClose(!sideBarClose);
  }

  return (
    <nav className={`sidebar ${sideBarClose ? "close" : null}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="images/logo.png" alt="Chaye" />
          </span>

          <div className="text logo-text">
            <span className="name">Chaye</span>
            {/*<span className="profession">New Edge</span>*/}
          </div>
        </div>

        <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box" onClick={() => { setSideBarClose(false) }}>
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Rechercher..." onChange={handleSearch} />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <Link to={'/announcements'}>
                <i className="bx bx-tada-hover bxs-widget bx-md icon"></i>
                <span className="text nav-text">Annonces</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to={isLoggedIn ? `/profile/${userData.id}` : '/loginSignup'}>
                <i className="bx bx-tada-hover bxs-user-detail bx-md icon"></i>
                <span className="text nav-text">Mon compte</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to={'/'}>
                <i className="bx bx-tada-hover bxs-help-circle bx-md icon"></i>
                <span className="text nav-text">Support</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to={'/'}>
                <i className="bx bx-tada-hover bxs-info-circle bx-md icon"></i>
                <span className="text nav-text">À propos de nous </span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to={'/'}>
                <i className="bx bxs-bell bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Mes messages </span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to={'/'}>
                <i className="bx bxs-wallet bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Portefeuille</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          {isLoggedIn && (
            <li onClick={handleLogout}>
              
                <i className="bx bx-log-out bx-tada-hover bx-md icon"></i>
                <span className="text nav-text pointer" >Se deconnecter</span>
              
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
};

export default Navbar;
