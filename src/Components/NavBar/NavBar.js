import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import '../styles/nav.css';

function Navbar (){
  return (
    <div className="content-menu">
      <a href="/"> 
        <img src={"img/logo.png"} alt="Logo" className="logo" />
      </a>
      <ul className='text-decoration-none'>
        <li>
          <a href="/announcements">
            <i className="fa-solid fa-bullhorn"></i>
            <span> Annonces</span>
          </a>
        </li>

        <li> 
          <i className="fa-solid me-3 fa-user "></i>
          <Dropdown item text="Mon Compte" className="custom-dropdown">
              <Dropdown.Menu>
                <Dropdown.Item  as="a" href="/SignUp"> S'inscrire</Dropdown.Item>
                <Dropdown.Item as="a" href="/login"> Se connecter</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        </li>

        <li>
            <a href="/AboutUs">
              <i className="fa-solid fa-bullhorn"></i>
              <span>À propos de nous</span> 
          </a>
        </li>

        <li>
          <a href="/support">
            <i className="fa-solid fa-circle-info"></i>
              <span> Support</span>
          </a>
        </li>

        <li>  
          <a href="/allmembers">
            <i class="fa-solid fa-users"></i>
            <span> AllMembres </span> 
          </a>
        </li>
        
        <li>  
          <a href="http://localhost:5000/logout" >
            Déconnecter
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
