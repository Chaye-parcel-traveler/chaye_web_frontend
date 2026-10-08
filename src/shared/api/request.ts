import apiClient, { normalizeApiError } from '../../lib/api-client';

type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST';

type RequestOptions = {
  auth?: boolean;
  body?: BodyInit | Record<string, unknown>;
  headers?: Record<string, string>;
  method: HttpMethod;
  skipCsrf?: boolean;
};

let csrfCookiePromise: Promise<void> | null = null;

export const ensureApiCsrfCookie = async () => {
  csrfCookiePromise ??= apiClient
    .get('/auth/csrf')
    .then(() => undefined)
    .finally(() => {
      csrfCookiePromise = null;
    });

  return csrfCookiePromise;
};

const requiresCsrf = (method: HttpMethod) => method !== 'GET';

export const apiRequest = async <T>(
  path: string,
  options: RequestOptions,
): Promise<T> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...options.headers,
  };

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof URLSearchParams)
  ) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    if (!options.skipCsrf && requiresCsrf(options.method)) {
      await ensureApiCsrfCookie();
    }

    const response = await apiClient.request<T>({
      data: options.body,
      headers,
      method: options.method,
      url: path,
    });

    return response.data;
  } catch (error) {
    throw new Error(normalizeApiError(error).message);
  }
};
