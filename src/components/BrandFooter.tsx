import { Link } from 'react-router-dom';
import './BrandShell.css';

function BrandFooter() {
  return (
    <footer className="chaye-brand-footer">
      <Link className="chaye-brand-wordmark" to="/">
        Chayé<span aria-hidden="true">.</span>
      </Link>
      <p>La confiance voyage avec vous.</p>
      <nav aria-label="Liens légaux">
        <Link to="/legal-notice">Mentions légales</Link>
        <Link to="/privacy-policy">Confidentialité</Link>
      </nav>
      <span>© 2026 Chayé</span>
    </footer>
  );
}

export default BrandFooter;
