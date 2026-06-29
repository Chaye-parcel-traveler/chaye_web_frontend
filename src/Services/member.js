import apiClient, { normalizeApiError } from '../lib/api';

export async function login(credentials) {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    return Promise.reject(normalizeApiError(error));
  }
}

export async function logout() {
  try {
    const response = await apiClient.post('/logout');
    return response.data;
  } catch (error) {
    return Promise.reject(normalizeApiError(error));
  }
}

export async function fetchMembers() {
  try {
    const response = await apiClient.get('/members');
    return response.data;
  } catch (error) {
    return Promise.reject(normalizeApiError(error));
  }
}
