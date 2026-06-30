import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { server } from '../test/mocks/server';
import Navbar from './Navbar';

test('uses canonical destinations for available navigation items', async () => {
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
});
