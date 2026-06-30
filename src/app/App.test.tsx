import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import type { ReactNode } from 'react';

import App from './App';

vi.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: ReactNode }) => children,
  useGoogleLogin: () => vi.fn(),
}));

vi.mock('aos', () => ({
  default: {
    init: vi.fn(),
  },
}));

vi.mock('./layouts/MainLayout', () => ({
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
