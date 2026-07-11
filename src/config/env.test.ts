import { describe, expect, it } from 'vitest';
import { appEnv } from './env';

describe('appEnv', () => {
  it('exposes controlled frontend defaults in tests', () => {
    expect(appEnv).toMatchObject({
      apiAssetsUrl: 'http://localhost:3333',
      apiUrl: 'http://localhost:3333',
      appEnv: 'test',
      isE2E: false,
      publicAssetsUrl: '/',
      useApiMocks: false,
    });
  });
});
