import { apiRequest } from '../../../shared/api/request';
import { getAuthToken, saveAuthSession } from '../../auth/api/auth.api';
import { normalizeMemberProfile } from './member.normalizers';
import type { AccountStatusResponse } from './member.types';

export const getCurrentMember = async () => {
  const member = normalizeMemberProfile(
    await apiRequest<unknown>('/me', {
      method: 'GET',
      auth: true,
      getAuthToken,
    }),
  );

  const token = getAuthToken();
  if (token) {
    saveAuthSession({ token, member });
  }

  return member;
};

export const getMember = (memberId: number) =>
  apiRequest<unknown>(`/members/${memberId}`, {
    method: 'GET',
    auth: true,
    getAuthToken,
  }).then(normalizeMemberProfile);

export const getCurrentAccountStatus = async () => {
  const member = await getCurrentMember();

  return {
    status: member.status,
    reason: '',
  } satisfies AccountStatusResponse;
};
