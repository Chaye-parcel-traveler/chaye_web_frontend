import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="">
      <div className="">
        <p>© 2023,Chaye</p>
      </div>
      <ul className="lienFooter ">
        <li>
          <Link to="/legal-notice">Mentions légales</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Politiques de confidentialité</Link>
        </li>
        <li>
          <span>Tous droits reservés</span>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
