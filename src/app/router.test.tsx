import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { vi } from 'vitest';

import AppRouter from './router';

vi.mock('./layouts/MainLayout', () => ({
  default: () => <Outlet />,
}));

vi.mock('../features/packages/pages/NewPackagePage', () => ({
  default: () => <h1>Nouveau colis</h1>,
}));

function renderRoute(path: string) {
  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppRouter />
    </MemoryRouter>
  );
}

describe('application routes', () => {
  it('loads a canonical route asynchronously', async () => {
    renderRoute('/packages/new');

    expect(screen.getByText('Chargement…')).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: 'Nouveau colis' })
    ).toBeInTheDocument();
  });

  it('redirects a historical URL to its canonical URL', async () => {
    renderRoute('/addPackage');

    expect(
      await screen.findByRole('heading', { name: 'Nouveau colis' })
    ).toBeInTheDocument();
  });
});
