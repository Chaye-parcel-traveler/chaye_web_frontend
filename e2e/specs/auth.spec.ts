import { expect, test } from '@playwright/test';
import { createTestUser } from '../fixtures/users';
import { AuthPage } from '../pages/auth.page';
import { createMember } from '../support/api';

const apiUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3333';

test('signs up with a unique email, logs in, stores the token and loads /me', async ({
  page,
}) => {
  const auth = new AuthPage(page);
  const user = createTestUser();
  await auth.open();
  await auth.showSignup();

  const signupResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/members'
  );
  await auth.signup(user);
  expect((await signupResponsePromise).status()).toBe(201);
  await expect(auth.loginForm).toBeVisible();

  const loginResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/login'
  );
  const meResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'GET' &&
      new URL(response.url()).pathname === '/me' &&
      response.status() === 200
  );
  await auth.login(user);

  const loginResponse = await loginResponsePromise;
  expect(loginResponse.status()).toBe(200);
  const loginBody = await loginResponse.json();
  expect(loginBody.token ?? loginBody.value).toBeTruthy();
  expect(
    await page.evaluate(() => sessionStorage.getItem('token'))
  ).toBeTruthy();
  expect((await meResponsePromise).status()).toBe(200);
  await expect(page).toHaveURL('/');
});

test('logs in and logs out by revoking and removing the current token', async ({
  page,
  request,
}) => {
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
  await expect(page).toHaveURL('/');

  const token = await page.evaluate(() => sessionStorage.getItem('token'));
  expect(token).toBeTruthy();

  const logoutResponsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      new URL(response.url()).pathname === '/logout'
  );
  await page.getByTestId('logout-button').click();
  expect((await logoutResponsePromise).status()).toBe(200);
  expect(await page.evaluate(() => sessionStorage.getItem('token'))).toBeNull();
  await expect(page.getByTestId('logout-button')).toHaveCount(0);

  const revokedTokenResponse = await request.get(`${apiUrl}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(revokedTokenResponse.status()).toBe(401);
});
