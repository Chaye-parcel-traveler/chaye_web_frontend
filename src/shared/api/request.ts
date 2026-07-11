import apiClient, { normalizeApiError } from '../../lib/api-client';

type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST';

type RequestOptions = {
  auth?: boolean;
  body?: BodyInit | Record<string, unknown>;
  getAuthToken?: () => string | null;
  headers?: Record<string, string>;
  method: HttpMethod;
};

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

  if (options.auth && !headers.Authorization) {
    const token = options.getAuthToken?.();

    if (!token) {
      throw new Error('Vous devez être connecté pour effectuer cette action.');
    }

    headers.Authorization = `Bearer ${token}`;
  }

  try {
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
