import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import AppRouter from './router';

vi.mock('./layouts/MainLayout', () => ({
  default: () => <Outlet />,
}));

vi.mock('../features/home/pages/HomePage', () => ({
  default: () => <h1>Accueil</h1>,
}));

vi.mock('../features/auth/pages/LoginPage', () => ({
  default: () => <h1>Connexion</h1>,
}));

vi.mock('../features/announcements/pages/AnnouncementsPage', () => ({
  default: () => <h1>Annonces</h1>,
}));

function renderRoute(path: string) {
  return render(
    <MemoryRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      initialEntries={[path]}
    >
      <AppRouter />
    </MemoryRouter>,
  );
}

describe('AppRouter', () => {
  it('loads the home route asynchronously', async () => {
    renderRoute('/');

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: 'Accueil' }),
    ).toBeInTheDocument();
  });

  it('loads an authenticated workflow route', async () => {
    renderRoute('/annonces');

    expect(
      await screen.findByRole('heading', { name: 'Annonces' }),
    ).toBeInTheDocument();
  });

  it('renders a useful 404 page for unknown routes', async () => {
    renderRoute('/route-inconnue');

    expect(
      await screen.findByRole('heading', { name: 'Page introuvable' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Retour à l’accueil' }),
    ).toHaveAttribute('href', '/');
  });
});
