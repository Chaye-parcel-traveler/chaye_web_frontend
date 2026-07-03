const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type HttpMethod = 'GET' | 'PATCH' | 'POST';

type RequestOptions = {
  method: HttpMethod;
  body?: unknown;
};

export type RegisterPayload = {
  firstname: string;
  lastname: string;
  birthDate: string;
  country: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  termsAccepted: boolean;
  termsVersion: string;
  isMinor: boolean;
};

export type ReportTargetType = 'member' | 'announcement' | 'registration';

export type ReportPayload = {
  targetType: ReportTargetType;
  targetId?: string | number;
  reason: string;
  description?: string;
  reporterEmail?: string;
};

export type ModerationReportStatus =
  | 'open'
  | 'dismissed'
  | 'warned'
  | 'suspended';

export type ModerationReport = {
  id: number;
  targetType: ReportTargetType;
  targetId?: string | number;
  targetLabel: string;
  reason: string;
  description?: string;
  reporterEmail?: string;
  status: ModerationReportStatus;
  createdAt: string;
};

export type ModerationAction = 'dismiss' | 'warn' | 'suspend';

export type AccountStatus = 'active' | 'suspended' | 'banned';

export type AccountStatusResponse = {
  status: AccountStatus;
  reason?: string;
};

const request = async <T>(
  path: string,
  options: RequestOptions,
): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload?.message ?? payload?.error ?? 'La requête a échoué.';
    throw new Error(message);
  }

  return response.json().catch(() => undefined as T);
};

export const registerMember = (payload: RegisterPayload) =>
  request('/members', {
    method: 'POST',
    body: payload,
  });

export const createReport = (payload: ReportPayload) =>
  request('/reports', {
    method: 'POST',
    body: payload,
  });

export const getModerationReports = () =>
  request<ModerationReport[]>('/moderation/reports', {
    method: 'GET',
  });

export const dismissModerationReport = (reportId: number) =>
  request(`/moderation/reports/${reportId}/dismiss`, {
    method: 'PATCH',
  });

export const warnModerationTarget = (reportId: number) =>
  request(`/moderation/reports/${reportId}/warn`, {
    method: 'POST',
  });

export const suspendModerationTarget = (reportId: number) =>
  request(`/moderation/reports/${reportId}/suspend`, {
    method: 'POST',
  });

export const getCurrentAccountStatus = () =>
  request<AccountStatusResponse>('/me/account-status', {
    method: 'GET',
  });

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
