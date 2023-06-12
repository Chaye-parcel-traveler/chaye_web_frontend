import React, { useEffect } from 'react';

const Deconnecter = () => {
  useEffect(() => {
    // Supprimer le JWT du cookie
    document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';//définit la date d'expiration du cookie à une date passée, ce qui le rend invalide et le supprime du navigateur.

    // Rediriger vers la page de connexion ou toute autre page appropriée
    window.location.href = '/connexion';
  }, []);

  return (
    <div>
      <h2>Déconnexion en cours...</h2>
    </div>
  );
};

export default Deconnecter;
