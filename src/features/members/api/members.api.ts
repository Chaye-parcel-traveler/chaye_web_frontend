import apiClient, { normalizeApiError } from '../../../lib/api-client';
import type { Member } from '../member.types';

export async function fetchMembers(): Promise<Member[]> {
  try {
    const response = await apiClient.get<Member[]>('/members');
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}
