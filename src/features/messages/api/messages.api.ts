import { unwrapArray } from '../../../shared/api/normalizers';
import { apiRequest } from '../../../shared/api/request';
import { getAuthToken, getStoredMember } from '../../auth/api/auth.api';
import {
  normalizeTchatDiscussion,
  normalizeTchatMessage,
} from './messages.normalizers';

export const getDiscussions = () =>
  apiRequest<unknown>('/tchat-discussions', {
    method: 'GET',
    auth: true,
    getAuthToken,
  }).then((discussions) =>
    unwrapArray(discussions).map(normalizeTchatDiscussion),
  );

export const getDiscussion = (discussionId: number) =>
  apiRequest<unknown>(`/tchat-discussions/${discussionId}`, {
    method: 'GET',
    auth: true,
    getAuthToken,
  }).then(normalizeTchatDiscussion);

export const createDiscussion = (discussionReceiverId: number) =>
  apiRequest<unknown>('/tchat-discussions', {
    method: 'POST',
    auth: true,
    getAuthToken,
    body: { discussionReceiverId },
  }).then(normalizeTchatDiscussion);

export const findOrCreateDiscussion = async (otherMemberId: number) => {
  const discussions = await getDiscussions();
  const currentMember = getStoredMember();

  if (currentMember) {
    const existingDiscussion = discussions.find(
      (discussion) =>
        (discussion.discussionOpenerId === currentMember.id &&
          discussion.discussionReceiverId === otherMemberId) ||
        (discussion.discussionReceiverId === currentMember.id &&
          discussion.discussionOpenerId === otherMemberId),
    );

    if (existingDiscussion) {
      return existingDiscussion;
    }
  }

  return createDiscussion(otherMemberId);
};

export const getDiscussionMessages = (discussionId: number) =>
  apiRequest<unknown>(`/tchat-discussions/${discussionId}/messages`, {
    method: 'GET',
    auth: true,
    getAuthToken,
  }).then((messages) => unwrapArray(messages).map(normalizeTchatMessage));

export const sendDiscussionMessage = (discussionId: number, content: string) =>
  apiRequest<unknown>(`/tchat-discussions/${discussionId}/messages`, {
    method: 'POST',
    auth: true,
    getAuthToken,
    body: { content },
  }).then(normalizeTchatMessage);
