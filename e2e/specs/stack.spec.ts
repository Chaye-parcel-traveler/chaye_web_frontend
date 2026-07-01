import { expect, test } from '@playwright/test';
import { seededAnnouncement } from '../fixtures/announcements';

const apiUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3333';

test('loads the frontend and displays the seeded published announcement', async ({
  page,
  request,
}) => {
  const apiResponse = await request.get(`${apiUrl}/`);
  expect(apiResponse.ok()).toBeTruthy();

  const frontendResponse = await page.goto('/');
  expect(frontendResponse?.ok()).toBeTruthy();

  const announcementsResponse = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      response.request().resourceType() === 'xhr' &&
      new URL(response.url()).pathname === '/announcements'
  );
  await page.goto('/announcements');
  expect((await announcementsResponse).status()).toBe(200);
  await expect(
    page
      .getByTestId('announcement-card')
      .filter({ hasText: seededAnnouncement.arrivingAt })
      .first()
  ).toBeVisible();
});
