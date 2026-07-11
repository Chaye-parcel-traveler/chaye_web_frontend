import axios from 'axios';
import { appEnv } from '../config/env';

export type ApiErrorPayload = {
  error?: string;
  errors?: Array<{ message?: string }> | Record<string, unknown>;
  message?: string;
};

export type NormalizedApiError = {
  details?: unknown;
  message: string;
  status?: number;
};

const apiBaseUrl = appEnv.apiUrl;

const normalizePath = (path: string) => {
  if (!path) {
    return '';
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return path.startsWith('/') ? path : `/${path}`;
};

export const getApiUrl = (path = '') => {
  const normalizedPath = normalizePath(path);

  if (!apiBaseUrl || /^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${apiBaseUrl.replace(/\/$/, '')}${normalizedPath}`;
};

export const getApiAssetUrl = (path?: string | null) => {
  const normalizedPath = normalizePath(path ?? '');

  if (!normalizedPath || /^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${appEnv.apiAssetsUrl}${normalizedPath}`;
};

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
});

export const setApiAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete apiClient.defaults.headers.common.Authorization;
};

const getFirstValidationMessage = (errors: ApiErrorPayload['errors']) => {
  if (Array.isArray(errors)) {
    return errors.find((error) => error.message)?.message;
  }

  if (errors && typeof errors === 'object') {
    const firstValue = Object.values(errors)[0];

    if (Array.isArray(firstValue)) {
      return firstValue.find((message) => typeof message === 'string');
    }

    if (typeof firstValue === 'string') {
      return firstValue;
    }
  }

  return undefined;
};

export const normalizeApiError = (error: unknown): NormalizedApiError => {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    return {
      details: error.response?.data,
      message:
        error.response?.data?.message ??
        error.response?.data?.error ??
        getFirstValidationMessage(error.response?.data?.errors) ??
        error.message ??
        'La requête a échoué.',
      status: error.response?.status,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'La requête a échoué.' };
};

export default apiClient;
