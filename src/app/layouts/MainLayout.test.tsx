import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import MainLayout from './MainLayout';

vi.mock('../../components/Navbar', () => ({
  default: () => <nav aria-label="Navigation applicative" />,
}));

vi.mock('../../components/Footer', () => ({
  default: () => <footer>Pied de page applicatif</footer>,
}));

function renderLayout(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<main>Accueil éditorial</main>} />
          <Route
            path="announcements"
            element={<main>Liste des trajets</main>}
          />
          <Route path="about" element={<h1>À propos</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

test('keeps the homepage free of the application sidebar and footer', () => {
  renderLayout('/');

  expect(screen.getByText('Accueil éditorial')).toBeInTheDocument();
  expect(
    screen.queryByRole('navigation', { name: 'Navigation applicative' })
  ).not.toBeInTheDocument();
  expect(screen.queryByText('Pied de page applicatif')).not.toBeInTheDocument();
});

test('uses the modern public shell for the trip list', () => {
  renderLayout('/announcements');

  expect(screen.getByText('Liste des trajets')).toBeInTheDocument();
  expect(
    screen.queryByRole('navigation', { name: 'Navigation applicative' })
  ).not.toBeInTheDocument();
  expect(screen.queryByText('Pied de page applicatif')).not.toBeInTheDocument();
});

test('preserves the application shell on inner pages', () => {
  renderLayout('/about');

  expect(
    screen.getByRole('navigation', { name: 'Navigation applicative' })
  ).toBeInTheDocument();
  expect(screen.getByText('Pied de page applicatif')).toBeInTheDocument();
});
