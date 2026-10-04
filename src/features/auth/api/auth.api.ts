import apiClient, {
  normalizeApiError,
  onApiUnauthorized,
} from '../../../lib/api-client';
import { apiRequest, ensureApiCsrfCookie } from '../../../shared/api/request';
import { normalizeMemberProfile } from '../../members/api/member.normalizers';
import type { MemberProfile } from '../../members/api/member.types';

const AUTH_TOKEN_KEY = 'chaye_auth_token';
const AUTH_MEMBER_KEY = 'chaye_auth_member';
const AUTH_EVENT = 'chaye-auth-changed';

export type RegisterPayload = {
  firstname: string;
  lastname: string;
  birthDate: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  termsAccepted: boolean;
  termsVersion: string;
  acceptedCguVersion: string;
  isMinor: boolean;
};

export type AuthSession = {
  member: MemberProfile;
};

export class AuthSessionRequestError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'AuthSessionRequestError';
    this.status = status;
  }
}

let currentMember: MemberProfile | null = null;

const getLocalStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  return window.localStorage;
};

const emitAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
};

export const removeLegacyAuthStorage = () => {
  const storage = getLocalStorage();

  storage?.removeItem(AUTH_TOKEN_KEY);
  storage?.removeItem(AUTH_MEMBER_KEY);
};

removeLegacyAuthStorage();

export const getStoredMember = () => currentMember;

export const getStoredSession = (): AuthSession | null => {
  if (!currentMember) {
    return null;
  }

  return { member: currentMember };
};

export const saveAuthSession = (session: AuthSession) => {
  removeLegacyAuthStorage();
  currentMember = session.member;
  emitAuthChange();
};

export const clearAuthSession = () => {
  removeLegacyAuthStorage();
  currentMember = null;
  emitAuthChange();
};

onApiUnauthorized(clearAuthSession);

export const onAuthChange = (callback: () => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
};

export const registerMember = (payload: RegisterPayload) =>
  apiRequest('/members', {
    method: 'POST',
    body: payload,
  });

export const ensureCsrfCookie = ensureApiCsrfCookie;

export const getCurrentSessionMember = async () => {
  let data: unknown;

  try {
    const response = await apiClient.get<unknown>('/me');
    data = response.data;
  } catch (error) {
    const normalizedError = normalizeApiError(error);
    throw new AuthSessionRequestError(
      normalizedError.message,
      normalizedError.status,
    );
  }

  const member = normalizeMemberProfile(data);

  saveAuthSession({ member });
  return member;
};

export const loginMember = async (email: string, password: string) => {
  await ensureCsrfCookie();
  await apiRequest<void>('/auth/web/login', {
    method: 'POST',
    body: { email, password },
    skipCsrf: true,
  });

  return { member: await getCurrentSessionMember() };
};

export const logoutMember = async () => {
  await ensureCsrfCookie();
  await apiRequest<void>('/auth/web/logout', {
    method: 'POST',
    auth: true,
    skipCsrf: true,
  });
  clearAuthSession();
};

export const getAge = (birthDate: string, now = new Date()) => {
  const birth = new Date(`${birthDate}T00:00:00`);

  if (Number.isNaN(birth.getTime())) {
    return null;
  }

  let age = now.getFullYear() - birth.getFullYear();
  const monthDelta = now.getMonth() - birth.getMonth();
  const birthdayHasNotPassed =
    monthDelta < 0 || (monthDelta === 0 && now.getDate() < birth.getDate());

  if (birthdayHasNotPassed) {
    age -= 1;
  }

  return age;
};

export const isMinorFromBirthDate = (birthDate: string) => {
  const age = getAge(birthDate);

  return age !== null && age < 18;
};
