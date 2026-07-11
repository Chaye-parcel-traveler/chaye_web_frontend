import {
  getValue,
  isRecord,
  toBoolean,
  toNumber,
  toStringValue,
  unwrapValue,
} from '../../../shared/api/normalizers';
import { normalizeMemberIdentity } from '../../members/api/member.normalizers';
import type { TchatDiscussion, TchatMessage } from './messages.types';

export const normalizeTchatDiscussion = (value: unknown): TchatDiscussion => {
  const unwrappedValue = unwrapValue(value, [
    'data',
    'discussion',
    'tchatDiscussion',
    'tchat_discussion',
  ]);
  const looseValue = isRecord(unwrappedValue) ? unwrappedValue : {};
  const openerId =
    toNumber(
      getValue(looseValue, 'discussionOpenerId') ??
        getValue(looseValue, 'discussion_opener_id') ??
        getValue(looseValue, 'openerId') ??
        getValue(looseValue, 'opener_id'),
    ) ?? 0;
  const receiverId =
    toNumber(
      getValue(looseValue, 'discussionReceiverId') ??
        getValue(looseValue, 'discussion_receiver_id') ??
        getValue(looseValue, 'receiverId') ??
        getValue(looseValue, 'receiver_id'),
    ) ?? 0;

  return {
    ...(looseValue as Partial<TchatDiscussion>),
    id: toNumber(getValue(looseValue, 'id')) ?? 0,
    discussionOpenerId: openerId,
    discussionReceiverId: receiverId,
    discussionOpener:
      normalizeMemberIdentity(
        getValue(looseValue, 'discussionOpener') ??
          getValue(looseValue, 'discussion_opener') ??
          getValue(looseValue, 'opener') ??
          getValue(looseValue, 'openerMember') ??
          getValue(looseValue, 'opener_member'),
      ) ?? undefined,
    discussionReceiver:
      normalizeMemberIdentity(
        getValue(looseValue, 'discussionReceiver') ??
          getValue(looseValue, 'discussion_receiver') ??
          getValue(looseValue, 'receiver') ??
          getValue(looseValue, 'receiverMember') ??
          getValue(looseValue, 'receiver_member'),
      ) ?? undefined,
    peer:
      normalizeMemberIdentity(
        getValue(looseValue, 'peer') ??
          getValue(looseValue, 'peerMember') ??
          getValue(looseValue, 'peer_member') ??
          getValue(looseValue, 'interlocutor') ??
          getValue(looseValue, 'interlocutorMember') ??
          getValue(looseValue, 'otherMember') ??
          getValue(looseValue, 'other_member'),
      ) ?? undefined,
    lastMessage:
      normalizeNullableTchatMessage(
        getValue(looseValue, 'lastMessage') ??
          getValue(looseValue, 'last_message') ??
          getValue(looseValue, 'latestMessage') ??
          getValue(looseValue, 'latest_message'),
      ) ?? null,
    hasUnreadMessages: toBoolean(
      getValue(looseValue, 'hasUnreadMessages') ??
        getValue(looseValue, 'has_unread_messages'),
    ),
    unreadCount:
      toNumber(
        getValue(looseValue, 'unreadCount') ??
          getValue(looseValue, 'unread_count'),
      ) ?? undefined,
    unreadMessagesCount:
      toNumber(
        getValue(looseValue, 'unreadMessagesCount') ??
          getValue(looseValue, 'unread_messages_count'),
      ) ?? undefined,
    createdAt:
      toStringValue(
        getValue(looseValue, 'createdAt') ?? getValue(looseValue, 'created_at'),
      ) ?? undefined,
    updatedAt:
      toStringValue(
        getValue(looseValue, 'updatedAt') ?? getValue(looseValue, 'updated_at'),
      ) ?? undefined,
  };
};

export const normalizeTchatMessage = (value: unknown): TchatMessage => {
  const unwrappedValue = unwrapValue(value, [
    'data',
    'message',
    'tchatMessage',
    'tchat_message',
  ]);
  const looseValue = isRecord(unwrappedValue) ? unwrappedValue : {};

  return {
    ...(looseValue as Partial<TchatMessage>),
    id: toNumber(getValue(looseValue, 'id')) ?? 0,
    discussionId:
      toNumber(
        getValue(looseValue, 'discussionId') ??
          getValue(looseValue, 'discussion_id'),
      ) ?? 0,
    memberId:
      toNumber(
        getValue(looseValue, 'memberId') ?? getValue(looseValue, 'member_id'),
      ) ?? 0,
    content: toStringValue(getValue(looseValue, 'content')) ?? '',
    deliveryStatus:
      (toStringValue(
        getValue(looseValue, 'deliveryStatus') ??
          getValue(looseValue, 'delivery_status'),
      ) as TchatMessage['deliveryStatus']) ?? undefined,
    isRead: toBoolean(
      getValue(looseValue, 'isRead') ?? getValue(looseValue, 'is_read'),
    ),
    readAt:
      toStringValue(
        getValue(looseValue, 'readAt') ?? getValue(looseValue, 'read_at'),
      ) ?? null,
    createdAt:
      toStringValue(
        getValue(looseValue, 'createdAt') ?? getValue(looseValue, 'created_at'),
      ) ?? undefined,
    updatedAt:
      toStringValue(
        getValue(looseValue, 'updatedAt') ?? getValue(looseValue, 'updated_at'),
      ) ?? undefined,
  };
};

const normalizeNullableTchatMessage = (value: unknown) => {
  if (!value) {
    return null;
  }

  return normalizeTchatMessage(value);
};
