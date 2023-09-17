import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../styles/nav.css';
import axios from 'axios';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJWT] = useState('');
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:5000/getjwt', { withCredentials: true })
      .then(response => {
        setIsLoggedIn(true);
        setUserData(response.data);
      }).catch(error => {
        setJWT('');
        setIsLoggedIn(false);
      });
    axios.get('http://localhost:5000/getConnectedUser', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        setUserData(false);
      });
  }, []);
  const handleSearch = (e) => {
    // Vous pouvez ajouter ici la logique de recherche en fonction de la valeur de e.target.value
  };


  return (
    <div className="content-menu">
      <a href="/">
        <img src={"/img/logo.png"} alt="Logo" className="logo" />
      </a>
      <ul className='text-decoration-none'>
        <li>
          <div className="input-group">
            <i className="fa-solid fa-search"></i>
            <input className="form-control" type="search" placeholder="Recherche" aria-label="Search" onChange={handleSearch} />
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
            <Dropdown item text="Mon Compte" className="custom-dropdown">
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
        {userData && userData.admin === true && (
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
            <a href="http://localhost:5000/logout">
              <i className="fa-solid fa-right-from-bracket fa-rotate-180"></i>
              Déconnecter
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
