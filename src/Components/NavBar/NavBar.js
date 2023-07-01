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
        href="/accueil"
        className={activeItem === 'accueil' ? 'active' : ''}
        onClick={() => handleItemClick('accueil')}
      >
        Accueil
      </a>
      <Dropdown item text="Mon Compte" className="custom-dropdown">
        <Dropdown.Menu>
          <Dropdown.Item
            as="a"
            href="/inscription"
            className={activeItem === 'inscription' ? 'active' : ''}
            onClick={() => handleItemClick('inscription')}
          >
            S'inscrire
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            href="/connexion"
            className={activeItem === 'connexion' ? 'active' : ''}
            onClick={() => handleItemClick('connexion')}
          >
            Se connecter
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <a
        href="/allmembres"
        className={activeItem === 'allmembres' ? 'active' : ''}
        onClick={() => handleItemClick('allmembres')}
      >
        AllMembres
      </a>
      <a
        href="/ajoutcolis"
        className={activeItem === 'ajoutcolis' ? 'active' : ''}
        onClick={() => handleItemClick('ajoutcolis')}
      >
        AjoutColis
      </a>
      <a
        href="http://localhost:5000/deconnecter"
        className={activeItem === 'deconnecter' ? 'active' : ''}
        onClick={() => handleItemClick('deconnecter')}
      >
        Déconnecter
      </a>
      {/* <a
        href="/chat"
        className={activeItem === 'chat' ? 'active' : ''}
        onClick={() => handleItemClick('chat')}
      >
        Chat
      </a> */}
    </nav>
  );
};

export default Navbar;
