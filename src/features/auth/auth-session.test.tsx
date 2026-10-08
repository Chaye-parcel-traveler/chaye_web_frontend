import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SignInOrUpBy from '../../components/SignInOrUpBy';
import { appEnv } from '../../config/env';
import type { MemberProfile } from '../members/api/member.types';
import { apiRequest } from '../../shared/api/request';
import { server } from '../../test/mocks/server';
import {
  getStoredMember,
  loginMember,
  logoutMember,
  saveAuthSession,
} from './api/auth.api';
import { AuthSessionProvider } from './auth-session';
import { useAuthSession } from './auth-session-context';

const apiUrl = appEnv.apiUrl;

const memberResponse: MemberProfile = {
  address: '1 rue du test',
  birthDate: '1990-01-01',
  email: 'codex@chaye.test',
  firstname: 'Codex',
  id: 61,
  isAdmin: false,
  lastname: 'Agent',
  phone: '+33610000001',
  role: 'member',
  status: 'active',
};

function SessionProbe() {
  const { isAuthenticated, isLoading, member, sessionError } = useAuthSession();

  return (
    <output>
      {isLoading
        ? 'loading'
        : sessionError
          ? 'session-error'
          : isAuthenticated
            ? `${member?.firstname} ${member?.lastname}`
            : 'guest'}
    </output>
  );
}

function LocationProbe() {
  const location = useLocation();

  return <output aria-label="location">{location.pathname}</output>;
}

function SessionProbeWithForbiddenAction() {
  const { member } = useAuthSession();

  return (
    <>
      <SessionProbe />
      <button
        type="button"
        onClick={() => {
          void apiRequest('/forbidden', {
            method: 'GET',
            auth: true,
          }).catch(() => undefined);
        }}
      >
        Forbidden
      </button>
      <span>{member?.email}</span>
    </>
  );
}

describe('auth session', () => {
  it('restores an existing web session from /me', async () => {
    server.use(
      http.get(`${apiUrl}/me`, () => HttpResponse.json(memberResponse)),
    );

    render(
      <AuthSessionProvider>
        <SessionProbe />
      </AuthSessionProvider>,
    );

    expect(await screen.findByText('Codex Agent')).toBeInTheDocument();
  });

  it('keeps a guest state when /me returns 401', async () => {
    server.use(
      http.get(`${apiUrl}/me`, () => new HttpResponse(null, { status: 401 })),
    );

    render(
      <AuthSessionProvider>
        <SessionProbe />
      </AuthSessionProvider>,
    );

    expect(await screen.findByText('guest')).toBeInTheDocument();
  });

  it('does not treat a /me 500 as a confirmed guest session', async () => {
    server.use(
      http.get(`${apiUrl}/me`, () => new HttpResponse(null, { status: 500 })),
    );

    render(
      <AuthSessionProvider>
        <SessionProbe />
      </AuthSessionProvider>,
    );

    expect(await screen.findByText('session-error')).toBeInTheDocument();
  });

  it('does not treat a /me network error as a confirmed guest session', async () => {
    server.use(http.get(`${apiUrl}/me`, () => HttpResponse.error()));

    render(
      <AuthSessionProvider>
        <SessionProbe />
      </AuthSessionProvider>,
    );

    expect(await screen.findByText('session-error')).toBeInTheDocument();
  });

  it('starts Google login without sending acceptedCguVersion', async () => {
    render(
      <MemoryRouter>
        <AuthSessionProvider>
          <SignInOrUpBy mode="login" />
        </AuthSessionProvider>
      </MemoryRouter>,
    );

    const googleLink = screen.getByRole('link', {
      name: /se connecter avec google/i,
    });

    expect(googleLink).toHaveAttribute(
      'href',
      `${apiUrl}/auth/google/redirect`,
    );
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });

  it('starts Google signup with acceptedCguVersion only after explicit consent', async () => {
    render(
      <MemoryRouter>
        <AuthSessionProvider>
          <SignInOrUpBy mode="register" />
        </AuthSessionProvider>
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole('link', { name: /se connecter avec google/i }),
    ).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /se connecter avec google/i }),
    );
    expect(
      await screen.findByText(
        'Vous devez accepter explicitement les CGU avant Google.',
      ),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByLabelText(
        /j’accepte les conditions générales d’utilisation de chayé/i,
      ),
    );

    expect(
      screen.getByRole('link', { name: /se connecter avec google/i }),
    ).toHaveAttribute(
      'href',
      `${apiUrl}/auth/google/redirect?acceptedCguVersion=2026-06-01`,
    );
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });

  it('restores the session after a successful Google callback redirect', async () => {
    server.use(
      http.get(`${apiUrl}/me`, () => HttpResponse.json(memberResponse)),
    );

    render(
      <MemoryRouter initialEntries={['/auth?oauth=success']}>
        <AuthSessionProvider>
          <SignInOrUpBy />
          <LocationProbe />
        </AuthSessionProvider>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByLabelText('location')).toHaveTextContent('/annonces'),
    );
    expect(getStoredMember()).toMatchObject({ email: 'codex@chaye.test' });
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });

  it('shows an absent Google session when the OAuth callback cannot restore /me with 401', async () => {
    server.use(
      http.get(`${apiUrl}/me`, () => new HttpResponse(null, { status: 401 })),
    );

    render(
      <MemoryRouter initialEntries={['/auth?oauth=success']}>
        <AuthSessionProvider>
          <SignInOrUpBy />
        </AuthSessionProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Session Google introuvable. Réessayez.'),
    ).toBeInTheDocument();
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });

  it('keeps OAuth callback /me 500 as a temporary session verification error', async () => {
    server.use(
      http.get(`${apiUrl}/me`, () => new HttpResponse(null, { status: 500 })),
    );

    render(
      <MemoryRouter initialEntries={['/auth?oauth=success']}>
        <AuthSessionProvider>
          <SignInOrUpBy />
        </AuthSessionProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(
        'Impossible de vérifier la session Google pour le moment. Réessayez.',
      ),
    ).toBeInTheDocument();
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });

  it('keeps OAuth callback /me network error as a temporary session verification error', async () => {
    server.use(http.get(`${apiUrl}/me`, () => HttpResponse.error()));

    render(
      <MemoryRouter initialEntries={['/auth?oauth=success']}>
        <AuthSessionProvider>
          <SignInOrUpBy />
        </AuthSessionProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText(
        'Impossible de vérifier la session Google pour le moment. Réessayez.',
      ),
    ).toBeInTheDocument();
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });

  it('logs in through csrf, web login, then /me', async () => {
    const calls: string[] = [];

    server.use(
      http.get(`${apiUrl}/auth/csrf`, () => {
        calls.push('csrf');
        return new HttpResponse(null);
      }),
      http.post(`${apiUrl}/auth/web/login`, async ({ request }) => {
        calls.push('login');
        expect(await request.json()).toEqual({
          email: 'codex@chaye.test',
          password: 'password',
        });
        return new HttpResponse(null, { status: 204 });
      }),
      http.get(`${apiUrl}/me`, () => {
        calls.push('me');
        return HttpResponse.json(memberResponse);
      }),
    );

    await expect(loginMember('codex@chaye.test', 'password')).resolves.toEqual({
      member: expect.objectContaining({ email: 'codex@chaye.test' }),
    });
    expect(calls).toEqual(['csrf', 'login', 'me']);
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });

  it('does not authenticate when web login fails', async () => {
    server.use(
      http.get(`${apiUrl}/auth/csrf`, () => new HttpResponse(null)),
      http.post(
        `${apiUrl}/auth/web/login`,
        () => new HttpResponse(null, { status: 401 }),
      ),
    );

    await expect(loginMember('bad@chaye.test', 'wrong')).rejects.toThrow();
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
  });

  it('logs out through csrf and web logout before clearing the session', async () => {
    const calls: string[] = [];
    saveAuthSession({ member: memberResponse });

    server.use(
      http.get(`${apiUrl}/auth/csrf`, () => {
        calls.push('csrf');
        return new HttpResponse(null);
      }),
      http.post(`${apiUrl}/auth/web/logout`, () => {
        calls.push('logout');
        return new HttpResponse(null, { status: 204 });
      }),
    );

    await logoutMember();

    expect(calls).toEqual(['csrf', 'logout']);
    expect(getStoredMember()).toBeNull();
  });

  it('clears the local session when web logout returns 401', async () => {
    saveAuthSession({ member: memberResponse });

    server.use(
      http.get(`${apiUrl}/auth/csrf`, () => new HttpResponse(null)),
      http.post(
        `${apiUrl}/auth/web/logout`,
        () => new HttpResponse(null, { status: 401 }),
      ),
    );

    await expect(logoutMember()).rejects.toThrow();
    expect(getStoredMember()).toBeNull();
  });

  it('keeps the local session when web logout returns 500', async () => {
    saveAuthSession({ member: memberResponse });

    server.use(
      http.get(`${apiUrl}/auth/csrf`, () => new HttpResponse(null)),
      http.post(
        `${apiUrl}/auth/web/logout`,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    await expect(logoutMember()).rejects.toThrow();
    expect(getStoredMember()).toMatchObject({
      email: 'codex@chaye.test',
    });
  });

  it('keeps the local session when web logout has a network error', async () => {
    saveAuthSession({ member: memberResponse });

    server.use(
      http.get(`${apiUrl}/auth/csrf`, () => new HttpResponse(null)),
      http.post(`${apiUrl}/auth/web/logout`, () => HttpResponse.error()),
    );

    await expect(logoutMember()).rejects.toThrow();
    expect(getStoredMember()).toMatchObject({
      email: 'codex@chaye.test',
    });
  });

  it('does not clear an authenticated session on 403', async () => {
    server.use(
      http.get(`${apiUrl}/me`, () => HttpResponse.json(memberResponse)),
      http.get(
        `${apiUrl}/forbidden`,
        () => new HttpResponse(null, { status: 403 }),
      ),
    );

    render(
      <AuthSessionProvider>
        <SessionProbeWithForbiddenAction />
      </AuthSessionProvider>,
    );

    expect(await screen.findByText('Codex Agent')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Forbidden' }));

    await waitFor(() =>
      expect(screen.getByText('codex@chaye.test')).toBeInTheDocument(),
    );
    expect(screen.getByText('Codex Agent')).toBeInTheDocument();
  });
});
