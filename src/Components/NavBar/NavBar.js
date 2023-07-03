import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../styles/nav.css';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('accueil');

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  return (
    <nav className="navbar">
      <img src={"img/logo.png"} alt="Logo" className="logo" />
      <a
        href="/home"
        className={activeItem === 'Accueil' ? 'active' : ''}
        onClick={() => handleItemClick('accueil')}
      >
        Accueil
      </a>
      <Dropdown item text="Mon Compte" className="custom-dropdown">
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
      </Dropdown>
      
      <a
        href="/allmembers"
        className={activeItem === 'Membres' ? 'active' : ''}
        onClick={() => handleItemClick('allmembres')}
      >
        AllMembres
      </a>
      <a
        href="/AddPackage"
        className={activeItem === 'Ajoutcolis' ? 'active' : ''}
        onClick={() => handleItemClick('ajoutcolis')}
      >
        AjoutColis
      </a>
      <a
        href="http://localhost:5000/logout"
        className={activeItem === 'Se déconnecter' ? 'active' : ''}
        onClick={() => handleItemClick('deconnecter')}
      >
        Déconnecter
      </a>
      <a
        href="/chat"
        className={activeItem === 'chat' ? 'active' : ''}
        onClick={() => handleItemClick('chat')}
      >
        Chat
      </a>
    </nav>
  );
};

export default Navbar;
