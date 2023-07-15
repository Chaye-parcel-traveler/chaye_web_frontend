import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../styles/nav.css';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('accueil');

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  return (
    <div className="navbar col-2">
      <ul className='text-decoration-none'>
        <a href="/"> <img src={"img/logo.png"} alt="Logo" className="logo" /> </a>
        <li><a href="/announcements"><i className="  fa-solid fa-bullhorn"></i> Annonces
        </a></li>

        <li> <i className="fa-solid me-3 fa-user "></i><Dropdown item text="Mon Compte" className="custom-dropdown">
          <Dropdown.Menu>
            <Dropdown.Item
              as="a"
              href="/SignUp"
              className={activeItem === 'S\'inscrire' ? 'active' : ''}
              onClick={() => handleItemClick('SignUp')}
            >
              S'inscrire
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href="/login"
              className={activeItem === 'Se connecter' ? 'active' : ''}
              onClick={() => handleItemClick('login')}
            >
              Se connecter
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown></li>
        <li>
          <a href="/AboutUs"
          ><i className="fa-solid fa-bullhorn"></i> À propos de nous
          </a></li>
        <li>
          <a href="/support"><i className="fa-solid fa-circle-info"></i>Support</a></li>
        <li>  <a
          href="/allmembers"
          className={activeItem === 'Membres' ? 'active' : ''}
          onClick={() => handleItemClick('allmembres')}
        ><i class="fa-solid fa-users  "></i>
          AllMembres
        </a></li>
        <li>  <a href="http://localhost:5000/logout" >
          Déconnecter
        </a></li>
      </ul>
    </div>
  );
};

export default Navbar;
