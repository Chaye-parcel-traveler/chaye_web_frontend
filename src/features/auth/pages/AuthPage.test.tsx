import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import { server } from '../../../test/mocks/server';
import AuthPage from './AuthPage';

vi.mock('@react-oauth/google', () => ({
  useGoogleLogin: () => vi.fn(),
}));

function renderLogin() {
  return render(
    <MemoryRouter
      initialEntries={['/auth']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<h1>Accueil</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('login form', () => {
  it('persists the API token and navigates home after a successful login', async () => {
    const user = userEvent.setup();
    let loginPayload: unknown;

    server.use(
      http.post('*/login', async ({ request }) => {
        loginPayload = await request.json();
        return HttpResponse.json({
          type: 'bearer',
          value: 'session-token',
        });
      }),
      http.get('*/me', ({ request }) => {
        if (request.headers.get('authorization') !== 'Bearer session-token') {
          return new HttpResponse(null, { status: 401 });
        }

        return HttpResponse.json({
          id: 42,
          email: 'lea@example.test',
          firstname: 'Léa',
          lastname: 'Martin',
        });
      })
    );

    renderLogin();

    const loginForm = within(
      screen.getByRole('form', { name: 'Formulaire de connexion' })
    );
    await user.type(
      loginForm.getByRole('textbox', { name: 'Adresse e-mail de connexion' }),
      'lea@example.test'
    );
    await user.type(
      loginForm.getByLabelText('Mot de passe de connexion'),
      'correct-password'
    );
    await user.click(loginForm.getByRole('button', { name: 'Valider' }));

    expect(
      await screen.findByRole('heading', { name: 'Accueil' })
    ).toBeInTheDocument();
    expect(loginPayload).toEqual({
      email: 'lea@example.test',
      password: 'correct-password',
    });
    expect(sessionStorage.getItem('token')).toBe('session-token');
  });

  it('reports an invalid login without navigating', async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    server.use(
      http.post('*/login', () =>
        HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
      )
    );

    renderLogin();

    const loginForm = within(
      screen.getByRole('form', { name: 'Formulaire de connexion' })
    );
    await user.type(
      loginForm.getByRole('textbox', { name: 'Adresse e-mail de connexion' }),
      'lea@example.test'
    );
    await user.type(
      loginForm.getByLabelText('Mot de passe de connexion'),
      'wrong-password'
    );
    await user.click(loginForm.getByRole('button', { name: 'Valider' }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Login incorrect');
    });
    expect(
      screen.getByRole('heading', { name: 'Content de te revoir' })
    ).toBeInTheDocument();
    expect(sessionStorage.getItem('token')).toBeNull();
  });
});
