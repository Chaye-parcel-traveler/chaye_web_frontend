import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import { persistAuthToken } from '../../lib/api';
import { server } from '../../test/mocks/server';
import Profile from './Profile';

vi.mock('../Header/Header', () => ({
  default: () => <header>Chaye</header>,
}));

vi.mock('../Message/AllMessages', () => ({
  default: () => <section>Messages</section>,
}));

function renderProfile() {
  return render(
    <MemoryRouter
      initialEntries={['/profile/42']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/loginSignup" element={<h1>Connexion</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('protected profile route', () => {
  it('renders the authenticated member when a session is present', async () => {
    persistAuthToken('session-token');
    server.use(
      http.get('*/me', ({ request }) => {
        if (request.headers.get('authorization') !== 'Bearer session-token') {
          return new HttpResponse(null, { status: 401 });
        }

        return HttpResponse.json({
          id: 42,
          email: 'lea@example.test',
          firstname: 'Léa',
          lastname: 'Martin',
          address: 'Fort-de-France',
          phone: '0596000000',
        });
      })
    );

    renderProfile();

    expect(
      await screen.findByRole('heading', { name: 'Martin Léa' })
    ).toBeInTheDocument();
    expect(screen.getByText(/lea@example\.test/)).toBeInTheDocument();
  });

  it('redirects to login when no session is present', async () => {
    server.use(
      http.get('*/me', ({ request }) => {
        if (!request.headers.has('authorization')) {
          return new HttpResponse(null, { status: 401 });
        }

        return HttpResponse.json({});
      })
    );

    renderProfile();

    expect(
      await screen.findByRole('heading', { name: 'Connexion' })
    ).toBeInTheDocument();
  });
});
