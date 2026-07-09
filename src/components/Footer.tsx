import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <span>© 2023 Chaye</span>
          </div>
          <div className="col-5">
            <span>
              <Link to="/legal-notice">Mentions légales</Link>
            </span>
            <span>
              <Link to="/privacy-policy">Politique de confidentialité</Link>
            </span>
            <span>Tous droits réservés</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
