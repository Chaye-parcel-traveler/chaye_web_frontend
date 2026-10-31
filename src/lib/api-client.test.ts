import { describe, expect, it } from 'vitest';
import apiClient from './api-client';

describe('apiClient', () => {
  it('is configured for cross-origin cookie sessions and XSRF', () => {
    expect(apiClient.defaults.withCredentials).toBe(true);
    expect(apiClient.defaults.withXSRFToken).toBe(true);
    expect(apiClient.defaults.xsrfCookieName).toBe('XSRF-TOKEN');
    expect(apiClient.defaults.xsrfHeaderName).toBe('X-XSRF-TOKEN');
  });
});
