import { describe, expect, it } from 'vitest';
import {
  normalizeTchatDiscussion,
  normalizeTchatMessage,
} from './messages.normalizers';

describe('message normalizers', () => {
  it('normalizes discussion peer, unread metadata and last message', () => {
    expect(
      normalizeTchatDiscussion({
        data: {
          discussion_opener_id: '1',
          discussion_receiver_id: '2',
          has_unread_messages: 'true',
          id: '9',
          last_message: {
            content: 'Bonjour',
            discussion_id: 9,
            id: 33,
            member_id: 2,
            read_at: null,
          },
          peer_member: {
            first_name: 'Fatou',
            id: 2,
            last_name: 'Bernard',
          },
          unread_count: '3',
        },
      }),
    ).toMatchObject({
      discussionOpenerId: 1,
      discussionReceiverId: 2,
      hasUnreadMessages: true,
      id: 9,
      lastMessage: {
        content: 'Bonjour',
        discussionId: 9,
        id: 33,
        memberId: 2,
      },
      peer: {
        firstname: 'Fatou',
        id: 2,
        lastname: 'Bernard',
      },
      unreadCount: 3,
    });
  });

  it('normalizes message delivery state fields', () => {
    expect(
      normalizeTchatMessage({
        content: 'Lu',
        delivery_status: 'received',
        discussion_id: '4',
        id: '12',
        is_read: 'true',
        member_id: '7',
        read_at: '2026-07-09T12:00:00.000Z',
      }),
    ).toMatchObject({
      content: 'Lu',
      deliveryStatus: 'received',
      discussionId: 4,
      id: 12,
      isRead: true,
      memberId: 7,
      readAt: '2026-07-09T12:00:00.000Z',
    });
  });
});
