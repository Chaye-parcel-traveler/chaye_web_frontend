import apiClient, { normalizeApiError } from '../../../lib/api-client';
import type { AuthSession, LoginCredentials } from '../auth.types';

export async function login(
  credentials: LoginCredentials
): Promise<AuthSession> {
  try {
    const response = await apiClient.post<AuthSession>('/login', credentials);
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function logout(): Promise<unknown> {
  try {
    const response = await apiClient.post('/logout');
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}
