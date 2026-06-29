import { afterEach, describe, expect, it, vi } from 'vitest';

const mockCreate = vi.fn();

vi.mock('axios', () => ({
  default: {
    create: (...args) => mockCreate(...args),
  },
}));

async function loadApi({ apiUrl = 'http://localhost:3333', token } = {}) {
  const mockClient = {
    defaults: {
      headers: {
        common: {},
      },
    },
  };

  vi.stubEnv('VITE_API_URL', apiUrl);
  sessionStorage.clear();

  if (token) {
    sessionStorage.setItem('token', token);
  }

  mockCreate.mockReset();
  mockCreate.mockReturnValue(mockClient);

  vi.resetModules();
  const apiModule = await import('./api');

  return { apiModule, mockClient };
}

describe('api client', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    sessionStorage.clear();
  });

  it('configures the axios client with VITE_API_URL', async () => {
    await loadApi({ apiUrl: 'http://localhost:3333' });

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3333',
    });
  });

  it('builds API URLs without hardcoding a localhost backend', async () => {
    const { apiModule } = await loadApi({
      apiUrl: 'https://api.example.test/',
    });

    expect(apiModule.getApiUrl('/members')).toBe(
      'https://api.example.test/members'
    );
    expect(apiModule.getApiAssetUrl('uploads/avatar.png')).toBe(
      'https://api.example.test/uploads/avatar.png'
    );
  });

  it('hydrates, persists, and clears the authorization token centrally', async () => {
    const { apiModule, mockClient } = await loadApi({ token: 'initial-token' });

    expect(mockClient.defaults.headers.common.Authorization).toBe(
      'Bearer initial-token'
    );

    apiModule.persistAuthToken('next-token');
    expect(sessionStorage.getItem('token')).toBe('next-token');
    expect(mockClient.defaults.headers.common.Authorization).toBe(
      'Bearer next-token'
    );

    apiModule.clearAuthToken();
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(mockClient.defaults.headers.common.Authorization).toBeUndefined();
  });
});
