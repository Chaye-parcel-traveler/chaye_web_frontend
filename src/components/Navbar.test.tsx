import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { server } from '../test/mocks/server';
import Navbar from './Navbar';

test('uses canonical destinations and preserves the sidebar layout contract', async () => {
  const user = userEvent.setup();
  server.use(http.get('*/me', () => new HttpResponse(null, { status: 401 })));

  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /Annonces/ })).toHaveAttribute(
    'href',
    '/announcements'
  );
  expect(screen.getByRole('link', { name: /Mon compte/ })).toHaveAttribute(
    'href',
    '/auth'
  );
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
    expect(item.closest('li')).not.toHaveClass('nav-link');
  }

  const toggle = screen.getByRole('button', { name: 'Ouvrir le menu' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await user.click(toggle);
  expect(
    screen.getByRole('button', { name: 'Fermer le menu' })
  ).toHaveAttribute('aria-expanded', 'true');
});
