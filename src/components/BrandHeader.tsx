import { Link } from 'react-router-dom';
import './BrandShell.css';

type BrandLink = {
  label: string;
  to: string;
};

type BrandHeaderProps = {
  actionLabel: string;
  actionTo: string;
  links: BrandLink[];
  variant?: 'overlay' | 'solid';
};

function BrandHeader({
  actionLabel,
  actionTo,
  links,
  variant = 'solid',
}: BrandHeaderProps) {
  return (
    <header className={`chaye-brand-header chaye-brand-header--${variant}`}>
      <Link className="chaye-brand-wordmark" to="/" aria-label="Accueil Chayé">
        Chayé<span aria-hidden="true">.</span>
      </Link>

      <nav aria-label="Navigation principale">
        {links.map((link) => (
          <Link key={`${link.to}-${link.label}`} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link className="chaye-brand-action" to={actionTo}>
        {actionLabel}
      </Link>
    </header>
  );
}

export default BrandHeader;
