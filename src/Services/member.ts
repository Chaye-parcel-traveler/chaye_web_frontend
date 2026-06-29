import apiClient, { normalizeApiError } from '../lib/api';
import type { AuthSession, LoginCredentials } from '../types/api';
import type { Member } from '../types/entities';

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

export async function fetchMembers(): Promise<Member[]> {
  try {
    const response = await apiClient.get<Member[]>('/members');
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}
