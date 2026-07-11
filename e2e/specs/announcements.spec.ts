import { expect, test } from '@playwright/test';
import { validShippingAnnouncement } from '../fixtures/announcements';
import { AnnouncementsPage } from '../pages/announcements.page';
import { AuthPage } from '../pages/auth.page';
import { createMember } from '../support/api';

test('creates a shipping announcement with the API payload', async ({
  page,
  request,
}) => {
  const user = await createMember(request);
  const auth = new AuthPage(page);
  const announcements = new AnnouncementsPage(page);

  await auth.openLogin();
  await auth.login(user);
  await expect(page).toHaveURL(/\/annonces$/);

  await announcements.openShippingForm();

  const creationResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/announcements',
  );
  await announcements.submitShippingAnnouncement(validShippingAnnouncement);
  const creationResponse = await creationResponsePromise;
  const payload = creationResponse.request().postDataJSON();

  expect(creationResponse.status()).toBe(201);
  expect(payload).toMatchObject({
    arrivingAt: validShippingAnnouncement.arrival,
    departingFrom: validShippingAnnouncement.departure,
    packageContentDescription: validShippingAnnouncement.content,
    type: 'shipping',
  });
  expect(payload).not.toHaveProperty('arriving_at');
  await expect(page.getByText('Annonce colis créée')).toBeVisible();
});

test('creates a transport announcement with flight fields', async ({
  page,
  request,
}) => {
  const user = await createMember(request);
  const auth = new AuthPage(page);
  const announcements = new AnnouncementsPage(page);

  await auth.openLogin();
  await auth.login(user);
  await expect(page).toHaveURL(/\/annonces$/);
  await page.goto('/carrier');

  const creationResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/announcements',
  );
  await announcements.submitTransportAnnouncement();
  const creationResponse = await creationResponsePromise;
  const payload = creationResponse.request().postDataJSON();

  expect(creationResponse.status()).toBe(201);
  expect(payload).toMatchObject({
    arrivalAirport: 'FDF',
    departureAirport: 'ORY',
    flightArrivalAt: '2026-08-15T18:20:00.000Z',
    flightDepartureAt: '2026-08-15T10:30:00.000Z',
    type: 'transport',
  });
  await expect(page.getByText('Annonce transport créée')).toBeVisible();
});

test('uses announcement filters and type tabs', async ({ page }) => {
  const announcements = new AnnouncementsPage(page);

  await announcements.openList();
  await announcements.fillAnnouncementFilters();
  await expect(page.getByLabel('Filtres des annonces')).toBeVisible();
  await page.getByRole('button', { name: /Expéditeur/i }).click();
  await page.getByRole('button', { name: /Transporteur/i }).click();
  await page.getByRole('button', { name: 'Réinitialiser' }).click();
  await expect(page.getByText(/annonce\(s\) affichée\(s\)/)).toBeVisible();
});
