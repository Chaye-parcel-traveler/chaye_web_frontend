import { expect, test } from '@playwright/test';

const apiUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3333';

test('loads the frontend and reaches the API', async ({ page, request }) => {
  const apiResponse = await request.get(`${apiUrl}/`);
  expect(apiResponse.ok()).toBeTruthy();

  const frontendResponse = await page.goto('/');
  expect(frontendResponse?.ok()).toBeTruthy();
});
