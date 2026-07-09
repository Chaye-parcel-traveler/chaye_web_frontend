import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach } from 'vitest';

import { saveAuthSession } from './API/apiManager';
import Navbar from './Navbar';

const renderNavbar = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  );

beforeEach(() => {
  window.localStorage.clear();
});

test('uses canonical destinations and preserves the sidebar layout contract', async () => {
  const user = userEvent.setup();
  renderNavbar();

  expect(
    screen.getByRole('navigation', { name: 'Navigation principale' })
  ).toBeInTheDocument();
  expect(screen.getByRole('searchbox', { name: 'Rechercher' })).toHaveAttribute(
    'id',
    'navigation-search'
  );
  expect(screen.getByRole('link', { name: /Annonces/ })).toHaveAttribute(
    'href',
    '/announcements'
  );
  expect(screen.getByRole('link', { name: /Mon compte/ })).toHaveAttribute(
    'href',
    '/profil'
  );
  expect(screen.getByRole('link', { name: /^Admin$/ })).toHaveAttribute(
    'href',
    '/admin'
  );
  expect(screen.getByRole('button', { name: /Se connecter/ })).toBeEnabled();
  expect(screen.getByRole('link', { name: /Support/ })).toHaveAttribute(
    'href',
    '/support'
  );
  expect(
    screen.getByRole('link', { name: /À propos de nous/ })
  ).toHaveAttribute('href', '/about');
  expect(
    screen.queryByRole('link', { name: /Mes messages/ })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /Portefeuille/ })
  ).not.toBeInTheDocument();

  for (const label of ['Mes messages', 'Portefeuille']) {
    const item = screen.getByText(label);
    expect(item.closest('.nav-item-content')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    expect(item.closest('li')).toHaveClass('menu-item');
    expect(item.closest('li')).toHaveClass('nav-link');
  }

  expect(screen.getByText('Dark mode')).toBeInTheDocument();

  const toggle = screen.getByRole('button', { name: 'Ouvrir le menu' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveAttribute('aria-controls', 'primary-navigation');
  await user.click(toggle);
  expect(
    screen.getByRole('button', { name: 'Fermer le menu' })
  ).toHaveAttribute('aria-expanded', 'true');
});

test('shows the register action on the login page when no member is stored', () => {
  renderNavbar('/login');

  expect(screen.getByRole('link', { name: /Créer un compte/ })).toHaveAttribute(
    'href',
    '/register'
  );
  expect(
    screen.queryByRole('button', { name: /Se connecter/ })
  ).not.toBeInTheDocument();
});

test('logs out through a stable button and clears the stored legacy session', async () => {
  const user = userEvent.setup();
  saveAuthSession({
    token: 'legacy-session-token',
    member: {
      id: 42,
      email: 'lea@example.test',
      firstname: 'Léa',
      lastname: 'Martin',
      avatarUrl: null,
      address: '1 rue Test',
      phone: '+596000000000',
      birthDate: '1990-01-01',
      role: 'member',
      status: 'active',
      isAdmin: false,
    },
  });

  renderNavbar();

  expect(screen.getByText('Léa Martin')).toBeInTheDocument();
  const authButton = screen.getByTestId('auth-action-button');
  expect(authButton).toHaveAccessibleName('Se déconnecter');
  await user.click(authButton);

  expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
  expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  expect(screen.getByRole('link', { name: /Créer un compte/ })).toHaveAttribute(
    'href',
    '/register'
  );
});
