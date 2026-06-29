import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import type { ReactNode } from 'react';

import App from './App';

vi.mock('./lib/api', () => ({
  __esModule: true,
  default: {
    defaults: {
      headers: {
        common: {},
      },
    },
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    put: vi.fn(() => Promise.resolve({ data: {} })),
  },
  clearAuthToken: vi.fn(),
  getApiAssetUrl: (path: string) => path,
  getApiUrl: (path: string) => path,
  normalizeApiError: (error: unknown) => error,
  persistAuthToken: vi.fn(),
  setAuthToken: vi.fn(),
}));

vi.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: ReactNode }) => children,
  useGoogleLogin: () => vi.fn(),
}));

vi.mock('aos', () => ({
  default: {
    init: vi.fn(),
  },
}));

vi.mock('./Components/MainLayout', () => ({
  default: () => <main data-testid="main-layout" />,
}));

test('renders the Chaye app shell', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByTestId('main-layout')).toBeInTheDocument();
});
