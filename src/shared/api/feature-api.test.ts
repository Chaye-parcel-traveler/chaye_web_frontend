import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import {
  createAnnouncement,
  getAnnouncements,
} from '../../features/announcements/api/announcements.api';
import { loginMember } from '../../features/auth/api/auth.api';
import { appEnv } from '../../config/env';
import { server } from '../../test/mocks/server';

const apiUrl = appEnv.apiUrl;

describe('feature API modules', () => {
  it('loads announcements through the shared API request layer', async () => {
    server.use(
      http.get(`${apiUrl}/announcements`, () =>
        HttpResponse.json([
          {
            arrivingAt: 'Fort-de-France',
            departingFrom: 'Paris-Orly',
            description: 'Trajet disponible',
            id: 42,
            memberId: 7,
            price: 80,
            status: 'draft',
            type: 'transport',
            weightAvailability: 12,
          },
        ]),
      ),
    );

    await expect(getAnnouncements()).resolves.toMatchObject([
      { id: 42, type: 'transport' },
    ]);
  });

  it('sends session-authenticated announcement creation requests', async () => {
    server.use(
      http.post(`${apiUrl}/announcements`, async ({ request }) => {
        expect(request.headers.get('authorization')).toBeNull();
        expect(await request.json()).toMatchObject({
          arrivingAt: 'Fort-de-France',
          departingFrom: 'Paris-Orly',
          type: 'shipping',
        });

        return HttpResponse.json(
          {
            arrivingAt: 'Fort-de-France',
            departingFrom: 'Paris-Orly',
            description: 'Colis',
            id: 10,
            memberId: 1,
            price: 15,
            status: 'draft',
            type: 'shipping',
            weightAvailability: 2.5,
          },
          { status: 201 },
        );
      }),
    );

    await expect(
      createAnnouncement({
        arrivingAt: 'Fort-de-France',
        departingFrom: 'Paris-Orly',
        description: 'Colis',
        packageDepthCm: 10,
        packageHeightCm: 30,
        packageWeightKg: 2.5,
        packageWidthCm: 20,
        price: 15,
        type: 'shipping',
      }),
    ).resolves.toMatchObject({ id: 10, status: 'draft' });
  });

  it('logs in through web session endpoints and stores only in memory', async () => {
    const calls: string[] = [];

    server.use(
      http.get(`${apiUrl}/auth/csrf`, () => {
        calls.push('csrf');
        return new HttpResponse(null);
      }),
      http.post(`${apiUrl}/auth/web/login`, async ({ request }) => {
        calls.push('login');
        expect(request.headers.get('authorization')).toBeNull();
        expect(await request.json()).toEqual({
          email: 'codex@chaye.test',
          password: 'test-password',
        });

        return new HttpResponse(null, { status: 204 });
      }),
      http.get(`${apiUrl}/me`, ({ request }) => {
        calls.push('me');
        expect(request.headers.get('authorization')).toBeNull();

        return HttpResponse.json({
          birthDate: '1990-01-01',
          email: 'codex@chaye.test',
          firstname: 'Codex',
          id: 61,
          isAdmin: false,
          lastname: 'Agent',
          role: 'member',
          status: 'active',
        });
      }),
    );

    const session = await loginMember('codex@chaye.test', 'test-password');

    expect(session.member).toMatchObject({ firstname: 'Codex', id: 61 });
    expect(calls).toEqual(['csrf', 'login', 'me']);
    expect(window.localStorage.getItem('chaye_auth_token')).toBeNull();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
  });
});
