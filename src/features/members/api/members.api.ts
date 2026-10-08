import { apiRequest } from '../../../shared/api/request';
import { saveAuthSession } from '../../auth/api/auth.api';
import { normalizeMemberProfile } from './member.normalizers';
import type { AccountStatusResponse, MemberProfile } from './member.types';

export const getCurrentMember = async () => {
  const member = normalizeMemberProfile(
    await apiRequest<unknown>('/me', {
      method: 'GET',
      auth: true,
    }),
  );

  saveAuthSession({ member });

  return member;
};

export const getMember = (memberId: number) =>
  apiRequest<unknown>(`/members/${memberId}`, {
    method: 'GET',
    auth: true,
  }).then(normalizeMemberProfile);

export const getMembers = async (): Promise<MemberProfile[]> => {
  const response = await apiRequest<unknown[]>('/members', {
    method: 'GET',
    auth: true,
  });

  return response.map(normalizeMemberProfile);
};

export const getCurrentAccountStatus = async () => {
  const member = await getCurrentMember();

  return {
    status: member.status,
    reason: '',
  } satisfies AccountStatusResponse;
};
