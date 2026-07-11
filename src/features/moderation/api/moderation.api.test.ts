import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { appEnv } from '../../../config/env';
import { server } from '../../../test/mocks/server';
import {
  createReport,
  dismissModerationReport,
  getModerationReports,
  suspendModerationTarget,
  warnModerationTarget,
} from './moderation.api';

const apiUrl = appEnv.apiUrl;

describe('moderation API', () => {
  it('creates reports and loads moderation reports', async () => {
    server.use(
      http.post(`${apiUrl}/reports`, async ({ request }) => {
        expect(await request.json()).toMatchObject({
          reason: 'Annonce trompeuse',
          targetType: 'announcement',
        });

        return HttpResponse.json({ id: 1 }, { status: 201 });
      }),
      http.get(`${apiUrl}/moderation/reports`, () =>
        HttpResponse.json([
          {
            createdAt: '2026-07-09T12:00:00.000Z',
            id: 1,
            reason: 'Annonce trompeuse',
            status: 'open',
            targetLabel: 'Annonce #1',
            targetType: 'announcement',
          },
        ]),
      ),
    );

    await expect(
      createReport({
        reason: 'Annonce trompeuse',
        targetId: 1,
        targetType: 'announcement',
      }),
    ).resolves.toEqual({ id: 1 });
    await expect(getModerationReports()).resolves.toMatchObject([
      { id: 1, status: 'open' },
    ]);
  });

  it('calls moderation action endpoints', async () => {
    const calledActions: string[] = [];

    server.use(
      http.patch(`${apiUrl}/moderation/reports/1/dismiss`, () => {
        calledActions.push('dismiss');
        return HttpResponse.json({ ok: true });
      }),
      http.post(`${apiUrl}/moderation/reports/1/warn`, () => {
        calledActions.push('warn');
        return HttpResponse.json({ ok: true });
      }),
      http.post(`${apiUrl}/moderation/reports/1/suspend`, () => {
        calledActions.push('suspend');
        return HttpResponse.json({ ok: true });
      }),
    );

    await dismissModerationReport(1);
    await warnModerationTarget(1);
    await suspendModerationTarget(1);

    expect(calledActions).toEqual(['dismiss', 'warn', 'suspend']);
  });
});
