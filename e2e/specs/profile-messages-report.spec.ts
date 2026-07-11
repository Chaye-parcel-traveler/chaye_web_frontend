import { expect, test } from '@playwright/test';
import { AuthPage } from '../pages/auth.page';
import { createMember } from '../support/api';

test('logs in, opens profile, messages and handles report submission', async ({
  page,
  request,
}) => {
  const user = await createMember(request);
  const auth = new AuthPage(page);

  await auth.openLogin();
  await auth.login(user);
  await expect(page).toHaveURL(/\/annonces$/);

  await page.goto('/profil');
  await expect(
    page.getByRole('heading', { name: `${user.firstname} ${user.lastname}` }),
  ).toBeVisible();

  const reportResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/reports',
  );
  await page.getByRole('button', { name: 'Signaler' }).click();
  await page.getByLabel('Motif').selectOption('Profil inapproprié');
  await page
    .getByLabel('Description optionnelle')
    .fill('Signalement E2E du profil connecté.');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  expect((await reportResponsePromise).status()).toBe(404);
  await expect(page.getByText('Cannot POST:/reports')).toBeVisible();

  await page.goto('/profil/messages');
  await expect(
    page.getByRole('heading', { name: 'Mes messages' }),
  ).toBeVisible();
});
