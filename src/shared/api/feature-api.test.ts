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

  it('sends authenticated announcement creation requests', async () => {
    window.localStorage.setItem('chaye_auth_token', 'test-token');

    server.use(
      http.post(`${apiUrl}/announcements`, async ({ request }) => {
        expect(request.headers.get('authorization')).toBe('Bearer test-token');
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

  it('normalizes login and stores the member session', async () => {
    server.use(
      http.post(`${apiUrl}/login`, () =>
        HttpResponse.json({
          abilities: ['*'],
          expiresAt: null,
          lastUsedAt: null,
          name: null,
          token: 'login-token',
          type: 'bearer',
        }),
      ),
      http.get(`${apiUrl}/me`, ({ request }) => {
        expect(request.headers.get('authorization')).toBe('Bearer login-token');

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
    expect(window.localStorage.getItem('chaye_auth_token')).toBe('login-token');
  });
});
