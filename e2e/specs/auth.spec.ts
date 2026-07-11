import { expect, test } from '@playwright/test';
import { createTestUser } from '../fixtures/users';
import { AuthPage } from '../pages/auth.page';

test('signs up a major member with accepted terms', async ({ page }) => {
  const auth = new AuthPage(page);
  const user = createTestUser();

  await auth.openRegister();

  const signupResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/members',
  );
  await auth.signup(user);

  expect((await signupResponsePromise).status()).toBe(201);
  await expect(page.getByText('Compte créé')).toBeVisible();
});
