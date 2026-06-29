import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { clearAuthToken } from './lib/api';
import { server } from './test/mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  clearAuthToken();
  sessionStorage.clear();
  vi.restoreAllMocks();
});

afterAll(() => {
  server.close();
});
