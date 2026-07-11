import type { APIRequestContext } from '@playwright/test';
import { createTestUser, type TestUser } from '../fixtures/users';

const apiUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3333';

export async function createMember(
  request: APIRequestContext,
): Promise<TestUser> {
  const user = createTestUser();
  const response = await request.post(`${apiUrl}/members`, {
    data: {
      ...user,
      acceptedCguVersion: '2026-06-01',
      isMinor: false,
      termsAccepted: true,
      termsVersion: '2026-06-01',
    },
  });

  if (response.status() !== 201) {
    throw new Error(
      `Unable to create E2E member: ${response.status()} ${await response.text()}`,
    );
  }

  return user;
}
