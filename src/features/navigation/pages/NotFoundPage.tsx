import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="container py-5 text-center">
      <p className="display-1 fw-bold" aria-hidden="true">
        404
      </p>
      <h1>Page introuvable</h1>
      <p>Cette adresse ne correspond à aucune page de Chaye.</p>
      <Link className="btn btn-primary" to="/">
        Retour à l’accueil
      </Link>
    </main>
  );
}

export default NotFoundPage;
