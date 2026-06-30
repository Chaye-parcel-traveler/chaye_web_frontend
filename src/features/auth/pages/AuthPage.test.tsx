import { render, screen, within } from '@testing-library/react';
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

    expect(await loginForm.findByRole('alert')).toHaveTextContent(
      'Invalid credentials'
    );
    expect(
      screen.getByRole('heading', { name: 'Content de te revoir' })
    ).toBeInTheDocument();
    expect(sessionStorage.getItem('token')).toBeNull();
  });

  it('focuses the first invalid login field without calling the API', async () => {
    const user = userEvent.setup();
    let requestCount = 0;
    server.use(
      http.post('*/login', () => {
        requestCount += 1;
        return HttpResponse.json({});
      })
    );

    renderLogin();
    const loginForm = within(
      screen.getByRole('form', { name: 'Formulaire de connexion' })
    );
    await user.click(loginForm.getByRole('button', { name: 'Valider' }));

    expect(
      await loginForm.findByText('Saisissez une adresse e-mail valide.')
    ).toBeInTheDocument();
    expect(
      loginForm.getByRole('textbox', { name: 'Adresse e-mail de connexion' })
    ).toHaveFocus();
    expect(requestCount).toBe(0);
  });
});

describe('signup form', () => {
  async function openAndFillSignup() {
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'Créer votre compte' })
    );
    const signupForm = within(
      screen.getByRole('form', { name: 'Formulaire d’inscription' })
    );
    await user.type(signupForm.getByLabelText('Prénom'), 'Léa');
    await user.type(signupForm.getByLabelText('Nom'), 'Martin');
    await user.type(signupForm.getByLabelText('Adresse'), '1 rue Victor-Hugo');
    await user.type(signupForm.getByLabelText('Téléphone'), '0696000000');
    await user.type(
      signupForm.getByLabelText('Date de naissance'),
      '1990-01-02'
    );
    await user.type(signupForm.getByLabelText('Email'), 'lea@example.test');
    await user.type(
      signupForm.getByLabelText('Créer votre mot de passe'),
      'correct-password'
    );
    await user.click(
      signupForm.getByLabelText('J’accepte les conditions générales')
    );
    return { signupForm, user };
  }

  it('submits an OpenAPI-aligned member payload', async () => {
    vi.stubEnv('VITE_CURRENT_CGU_VERSION', '2026-06-30');
    let signupPayload: unknown;
    server.use(
      http.post('*/members', async ({ request }) => {
        signupPayload = await request.json();
        return HttpResponse.json({ id: 42 }, { status: 201 });
      })
    );

    renderLogin();
    const { signupForm, user } = await openAndFillSignup();
    await user.click(signupForm.getByRole('button', { name: 'Valider' }));

    expect(
      await screen.findByRole('form', { name: 'Formulaire de connexion' })
    ).toBeInTheDocument();
    expect(signupPayload).toEqual({
      firstname: 'Léa',
      lastname: 'Martin',
      address: '1 rue Victor-Hugo',
      phone: '0696000000',
      birthDate: '1990-01-02',
      email: 'lea@example.test',
      password: 'correct-password',
      acceptedCguVersion: '2026-06-30',
    });
  });

  it('keeps the backend signup error inside the form', async () => {
    vi.stubEnv('VITE_CURRENT_CGU_VERSION', '2026-06-30');
    server.use(
      http.post('*/members', () =>
        HttpResponse.json(
          { message: 'This email is already registered' },
          { status: 422 }
        )
      )
    );

    renderLogin();
    const { signupForm, user } = await openAndFillSignup();
    await user.click(signupForm.getByRole('button', { name: 'Valider' }));

    expect(await signupForm.findByRole('alert')).toHaveTextContent(
      'This email is already registered'
    );
  });
});
