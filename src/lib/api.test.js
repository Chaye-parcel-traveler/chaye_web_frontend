const mockCreate = jest.fn();

jest.mock('axios', () => ({
  create: (...args) => mockCreate(...args),
}));

function loadApi({ apiUrl = 'http://localhost:3333', token } = {}) {
  const mockClient = {
    defaults: {
      headers: {
        common: {},
      },
    },
  };

  process.env.REACT_APP_API_URL = apiUrl;
  sessionStorage.clear();

  if (token) {
    sessionStorage.setItem('token', token);
  }

  mockCreate.mockReset();
  mockCreate.mockReturnValue(mockClient);

  let apiModule;
  jest.isolateModules(() => {
    apiModule = require('./api');
  });

  return { apiModule, mockClient };
}

describe('api client', () => {
  afterEach(() => {
    delete process.env.REACT_APP_API_URL;
    sessionStorage.clear();
  });

  it('configures the axios client with REACT_APP_API_URL', () => {
    loadApi({ apiUrl: 'http://localhost:3333' });

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3333',
    });
  });

  it('builds API URLs without hardcoding a localhost backend', () => {
    const { apiModule } = loadApi({ apiUrl: 'https://api.example.test/' });

    expect(apiModule.getApiUrl('/members')).toBe(
      'https://api.example.test/members'
    );
    expect(apiModule.getApiAssetUrl('uploads/avatar.png')).toBe(
      'https://api.example.test/uploads/avatar.png'
    );
  });

  it('hydrates, persists, and clears the authorization token centrally', () => {
    const { apiModule, mockClient } = loadApi({ token: 'initial-token' });

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
