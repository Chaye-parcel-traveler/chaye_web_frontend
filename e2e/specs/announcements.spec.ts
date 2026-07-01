import { expect, test, type APIRequestContext } from '@playwright/test';
import { validAnnouncement } from '../fixtures/announcements';
import { AnnouncementsPage } from '../pages/announcements.page';
import { AuthPage } from '../pages/auth.page';
import { createMember } from '../support/api';

async function loginAsTestUser(
  page: import('@playwright/test').Page,
  request: APIRequestContext
) {
  const auth = new AuthPage(page);
  const user = await createMember(request);
  await auth.open();
  const meResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      new URL(response.url()).pathname === '/me' &&
      response.status() === 200
  );
  await auth.login(user);
  await meResponsePromise;
}

test.beforeEach(async ({ page, request }) => {
  await loginAsTestUser(page, request);
});

test('creates a draft announcement with the camelCase API payload', async ({
  page,
}) => {
  const announcements = new AnnouncementsPage(page);
  await announcements.openCreationForm();

  const creationResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/announcements'
  );
  await announcements.submit(validAnnouncement);
  const creationResponse = await creationResponsePromise;
  const payload = creationResponse.request().postDataJSON();

  expect(payload).toMatchObject(validAnnouncement);
  expect(payload).toHaveProperty('departingFrom');
  expect(payload).toHaveProperty('arrivingAt');
  expect(payload).toHaveProperty('weightAvailability');
  expect(payload).not.toHaveProperty('departing_from');
  expect(payload).not.toHaveProperty('arriving_at');
  expect(payload).not.toHaveProperty('weight_availability');
  expect(creationResponse.status()).toBe(201);
  expect((await creationResponse.json()).status).toBe('draft');
  await expect(page).toHaveURL('/announcements');
});

test('shows a backend 422 error without navigating as if creation succeeded', async ({
  page,
}) => {
  const announcements = new AnnouncementsPage(page);
  await announcements.openCreationForm();
  await page.route('**/announcements', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }

    const payload = route.request().postDataJSON();
    await route.continue({
      postData: JSON.stringify({ ...payload, weightAvailability: 99 }),
    });
  });

  const invalidResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/announcements'
  );
  await announcements.submit(validAnnouncement);
  expect((await invalidResponsePromise).status()).toBe(422);
  await expect(announcements.form.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL('/announcements/new');
});
