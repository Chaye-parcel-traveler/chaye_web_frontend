import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./lib/api', () => ({
  __esModule: true,
  default: {
    defaults: {
      headers: {
        common: {},
      },
    },
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
  },
  clearAuthToken: jest.fn(),
  getApiAssetUrl: (path) => path,
  getApiUrl: (path) => path,
  normalizeApiError: (error) => error,
  persistAuthToken: jest.fn(),
  setAuthToken: jest.fn(),
}));

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
  useGoogleLogin: () => jest.fn(),
}));

jest.mock('aos', () => ({
  init: jest.fn(),
}));

jest.mock('./Components/MainLayout', () => {
  const React = require('react');

  return function MockMainLayout() {
    return React.createElement('main', { 'data-testid': 'main-layout' });
  };
});

test('renders the Chaye app shell', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByTestId('main-layout')).toBeInTheDocument();
});
