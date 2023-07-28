import React, { useState } from 'react';
// import { Dropdown } from 'semantic-ui-react';
import '../styles/nav.css';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('accueil');

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  return (
    // <div className="navbar col-2">
    //   <ul className='text-decoration-none'>
    //     <a href="/"> <img src={"img/logo.png"} alt="Logo" className="logo" /> </a>
    //     <li><a href="/announcements"><i className="  fa-solid fa-bullhorn"></i> Annonces
    //     </a></li>

    //     <li> <i className="fa-solid me-3 fa-user "></i><Dropdown item text="Mon Compte" className="custom-dropdown">
    //       <Dropdown.Menu>
    //         <Dropdown.Item
    //           as="a"
    //           href="/SignUp"
    //           className={activeItem === 'S\'inscrire' ? 'active' : ''}
    //           onClick={() => handleItemClick('SignUp')}
    //         >
    //           S'inscrire
    //         </Dropdown.Item>
    //         <Dropdown.Item
    //           as="a"
    //           href="/login"
    //           className={activeItem === 'Se connecter' ? 'active' : ''}
    //           onClick={() => handleItemClick('login')}
    //         >
    //           Se connecter
    //         </Dropdown.Item>
    //       </Dropdown.Menu>
    //     </Dropdown></li>
    //     <li>
    //       <a href="/AboutUs"
    //       ><i className="fa-solid fa-bullhorn"></i> À propos de nous
    //       </a></li>
    //     <li>
    //       <a href="/support"><i className="fa-solid fa-circle-info"></i>Support</a></li>
    //     <li>  <a
    //       href="/allmembers"
    //       className={activeItem === 'Membres' ? 'active' : ''}
    //       onClick={() => handleItemClick('allmembres')}
    //     ><i className="fa-solid fa-users  "></i>
    //       AllMembres
    //     </a></li>
    //     <li>  <a href="/logout" >
    //       Déconnecter
    //     </a></li>
    //   </ul>
    // </div>
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-chaye">
            <nav class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/"> <img src={"img/logo.png"} alt="Logo" className="navbar-brand d-flex align-items-center pb-3 mb-md-0 me-md-auto" /> </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                  data-bs-target="#navbarSupportedContent" 
                  aria-controls="navbarSupportedContent" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-white" id="menu">
                    <li class="nav-item"><a href="/announcements"><i className="fa-solid fa-bullhorn"></i> Annonces</a></li>
                    <li class="nav-item"><a href="/AboutUs"><i className="fa-solid fa-bullhorn"></i> À propos de nous</a></li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            {/* <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>  */}
                            <i className="fa-solid me-3 fa-user "></i><span class="ms-1 d-none d-sm-inline">Mon Compte</span>
                        </a>
                        <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="/SignUp" className={activeItem === 'S\'inscrire' ? 'active' : ''} 
                                  onClick={() => handleItemClick('SignUp')} > <span class="d-none d-sm-inline">S\'inscrire</span></a>
                            </li>
                            <li>
                                <a href="/login" className={activeItem === 'Se connecter' ? 'active' : ''} 
                                onClick={() => handleItemClick('login')}> <span class="d-none d-sm-inline">Se connecter</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#nothing" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Orders</span></a>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                            <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#nothing" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1</a>
                            </li>
                            <li>
                                <a href="#nothing" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Products</span> </a>
                            <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#nothing" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</a>
                            </li>
                            <li>
                                <a href="#nothing" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a>
                            </li>
                            <li>
                                <a href="#nothing" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a>
                            </li>
                            <li>
                                <a href="#nothing" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#nothing" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
                    </li>
                </ul>
                <hr/>
                <div class="dropdown pb-4">
                    <a href="#nothing" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#nothing">New project...</a></li>
                        <li><a class="dropdown-item" href="#nothing">Settings</a></li>
                        <li><a class="dropdown-item" href="#nothing">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li><a class="dropdown-item" href="#nothing">Sign out</a></li>
                    </ul>
                </div>
            </nav>
        </div>
  );
};

export default Navbar;
