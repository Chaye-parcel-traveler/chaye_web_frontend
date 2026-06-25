import axios from 'axios';

const AUTH_TOKEN_STORAGE_KEY = 'token';
const apiBaseUrl = import.meta.env.VITE_API_URL || '';

function normalizePath(path) {
  if (!path) {
    return '';
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function getApiUrl(path = '') {
  const normalizedPath = normalizePath(path);

  if (!apiBaseUrl || /^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${apiBaseUrl.replace(/\/$/, '')}${normalizedPath}`;
}

export function getApiAssetUrl(path) {
  return getApiUrl(path);
}

export function getStoredAuthToken() {
  return sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

export function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete apiClient.defaults.headers.common.Authorization;
}

export function persistAuthToken(token) {
  if (token) {
    sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } else {
    sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  setAuthToken(token);
}

export function clearAuthToken() {
  persistAuthToken(null);
}

export function normalizeApiError(error) {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Une erreur est survenue.';

  return {
    message,
    status: error?.response?.status,
    details: error?.response?.data,
  };
}

setAuthToken(getStoredAuthToken());

export default apiClient;
