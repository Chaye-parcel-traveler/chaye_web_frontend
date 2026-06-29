import { afterEach, describe, expect, it, vi } from 'vitest';

type MockClient = {
  defaults: {
    headers: {
      common: Record<string, string>;
    };
  };
};

const mockCreate = vi.fn<(config: { baseURL: string }) => MockClient>();

vi.mock('axios', () => ({
  default: {
    create: (config: { baseURL: string }) => mockCreate(config),
    isAxiosError: () => false,
  },
}));

type LoadApiOptions = {
  apiUrl?: string;
  token?: string;
};

async function loadApi({
  apiUrl = 'http://localhost:3333',
  token,
}: LoadApiOptions = {}) {
  const mockClient: MockClient = {
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

  it('normalizes unknown API errors without an untyped fallback', async () => {
    const { apiModule } = await loadApi();

    expect(
      apiModule.normalizeApiError(new Error('Network unavailable'))
    ).toEqual({
      message: 'Network unavailable',
    });
    expect(apiModule.normalizeApiError('unexpected failure')).toEqual({
      message: 'Une erreur est survenue.',
    });
  });
});
