import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../styles/nav.css';
import axios from 'axios';
import { logout } from '../../Services/member'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
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

  return (
    <div className="content-menu">
      <a href="/">
        <img src={"/img/logo.png"} alt="Logo" className="logo" />
      </a>
      <ul className='text-decoration-none'>
        <li>
          <div className="input-group">
            <i className="fa-solid fa-search"></i>
            <input className="form-control search" type="search" placeholder="Recherche" aria-label="Search" onChange={handleSearch} />
          </div>
        </li>
        <li>
          <a href="/announcements">
            <i className="fa-solid fa-bullhorn"></i>
            <span> Annonces</span>
          </a>
        </li>

        {!isLoggedIn && (
          <li>
            <i className="fa-solid fa-user "></i>
            <span>Compte</span>
            <Dropdown item  className="custom-dropdown">
              <Dropdown.Menu>
                <Dropdown.Item as="a" href="/SignUp"> S'inscrire</Dropdown.Item>
                <Dropdown.Item as="a" href="/login"> Se connecter</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        )}

        <li>
          <a href="/AboutUs">
            <i className="fa-solid fa-circle-info"></i>
            <span>À propos de nous</span>
          </a>
        </li>

        <li>
          <a href="/support">
            <i className="fa-solid fa-headset"></i>
            <span> Support</span>
          </a>
        </li>
        {userData && userData.isAdmin === true && (
          <li>
            <a href="/allmembers">
              <i className="fa-solid fa-users"></i>
              <span> AllMembres </span>
            </a>
          </li>
        )}



        {userData && (
          <li>
            <a href={`/profile/${userData.id}`}>
              <i className="fa-solid fa-user"></i>
              <span> Profile </span>
            </a>
          </li>
        )}

        {isLoggedIn && (
          <li className="logout-btn">
            <button onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>
              <span>  Déconnecter </span>
            
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
