import { useRef } from 'react';

const Navigation = () => {
  const sidebar = useRef<HTMLElement | null>(null);
  const toggle = () => sidebar.current?.classList.toggle('close');

  return (
    <nav className="sidebar close" ref={sidebar}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="images/logo.png" alt="Chaye" />
          </span>

          <div className="text logo-text">
            <span className="name">Chaye</span>
            {/* <span className="profession">New Edge</span> */}
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
              <a href="#">
                <i className="bx bx-tada-hover bxs-widget bx-md icon"></i>
                <span className="text nav-text">Annonces</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-tada-hover bxs-user-detail bx-md icon"></i>
                <span className="text nav-text">Mon compte</span>
              </a>
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
                <span className="text nav-text">À propos de nous </span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-bell bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Mes messages </span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-wallet bx-tada-hover bx-md icon"></i>
                <span className="text nav-text">Portefeuille</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="">
            <a href="/login">
              <i className="bx bx-log-out bx-tada-hover bx-md icon"></i>
              <span className="text nav-text">Se deconnecter</span>
            </a>
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
