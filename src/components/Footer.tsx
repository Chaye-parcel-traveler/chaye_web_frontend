import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <span>© 2023 Chaye</span>
          </div>
          <div className="col-5">
            <span>
              <a href="">Mentions légales</a>
            </span>
            <span>
              <a href="">Politique de confidentialité</a>
            </span>
            <span>
              <a href="">Tous droits réservés</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
