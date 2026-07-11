import { setApiAuthToken } from '../../../lib/api-client';
import { apiRequest } from '../../../shared/api/request';
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

export type AuthResponse = {
  type: string;
  name: string | null;
  token: string;
  abilities: string[];
  lastUsedAt: string | null;
  expiresAt: string | null;
};

export type AuthSession = {
  token: string;
  member: MemberProfile;
};

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

const parseStoredMember = () => {
  const storage = getLocalStorage();
  const rawMember = storage?.getItem(AUTH_MEMBER_KEY);

  if (!rawMember) {
    return null;
  }

  try {
    return JSON.parse(rawMember) as MemberProfile;
  } catch {
    storage?.removeItem(AUTH_MEMBER_KEY);
    return null;
  }
};

export const getAuthToken = () =>
  getLocalStorage()?.getItem(AUTH_TOKEN_KEY) ?? null;

setApiAuthToken(getAuthToken());

export const getStoredMember = () => parseStoredMember();

export const getStoredSession = (): AuthSession | null => {
  const token = getAuthToken();
  const member = parseStoredMember();

  if (!token || !member) {
    return null;
  }

  return { token, member };
};

export const saveAuthSession = (session: AuthSession) => {
  const storage = getLocalStorage();

  storage?.setItem(AUTH_TOKEN_KEY, session.token);
  storage?.setItem(AUTH_MEMBER_KEY, JSON.stringify(session.member));
  storage?.setItem('chaye_account_status', session.member.status);
  storage?.setItem('chaye_account_status_reason', '');
  setApiAuthToken(session.token);
  emitAuthChange();
};

export const clearAuthSession = () => {
  const storage = getLocalStorage();

  storage?.removeItem(AUTH_TOKEN_KEY);
  storage?.removeItem(AUTH_MEMBER_KEY);
  storage?.removeItem('chaye_account_status');
  storage?.removeItem('chaye_account_status_reason');
  setApiAuthToken(null);
  emitAuthChange();
};

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

export const loginMember = async (email: string, password: string) => {
  const auth = await apiRequest<AuthResponse>('/login', {
    method: 'POST',
    body: new URLSearchParams({ email, password }),
  });
  const member = normalizeMemberProfile(
    await apiRequest<unknown>('/me', {
      method: 'GET',
      auth: true,
      getAuthToken,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }),
  );

  const session = { token: auth.token, member };
  saveAuthSession(session);
  return session;
};

export const logoutMember = () => clearAuthSession();

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
