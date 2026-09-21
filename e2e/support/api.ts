import type { APIRequestContext } from '@playwright/test';
import { createTestUser, type TestUser } from '../fixtures/users';

const apiUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3333';

async function getXsrfToken(request: APIRequestContext): Promise<string> {
  const response = await request.get(`${apiUrl}/auth/csrf`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status() !== 204) {
    throw new Error(
      `Unable to bootstrap CSRF for E2E member: ${response.status()} ${await response.text()}`,
    );
  }

  const xsrfCookie = response
    .headersArray()
    .find(
      (header) =>
        header.name.toLowerCase() === 'set-cookie' &&
        header.value.startsWith('XSRF-TOKEN='),
    );

  const encodedToken = xsrfCookie?.value
    .split(';')[0]
    .replace(/^XSRF-TOKEN=/, '');

  if (!encodedToken) {
    throw new Error('Unable to read XSRF-TOKEN cookie for E2E member.');
  }

  return decodeURIComponent(encodedToken);
}

export async function createMember(
  request: APIRequestContext,
): Promise<TestUser> {
  const user = createTestUser();
  const xsrfToken = await getXsrfToken(request);
  const response = await request.post(`${apiUrl}/members`, {
    data: {
      ...user,
      acceptedCguVersion: '2026-06-01',
      isMinor: false,
      termsAccepted: true,
      termsVersion: '2026-06-01',
    },
    headers: {
      'X-XSRF-TOKEN': xsrfToken,
    },
  });

  if (response.status() !== 201) {
    throw new Error(
      `Unable to create E2E member: ${response.status()} ${await response.text()}`,
    );
  }

  return user;
}
