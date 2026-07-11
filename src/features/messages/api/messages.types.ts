import type { MemberIdentity } from '../../members/api/member.types';

export type TchatDiscussion = {
  id: number;
  discussionOpenerId: number;
  discussionReceiverId: number;
  discussionOpener?: MemberIdentity;
  discussionReceiver?: MemberIdentity;
  hasUnreadMessages?: boolean;
  interlocutor?: MemberIdentity;
  members?: MemberIdentity[];
  otherMember?: MemberIdentity;
  participants?: MemberIdentity[];
  peer?: MemberIdentity;
  lastMessage?: TchatMessage | null;
  unreadCount?: number;
  unreadMessagesCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TchatMessage = {
  id: number;
  discussionId: number;
  memberId: number;
  content: string;
  deliveryStatus?: 'read' | 'received' | 'sent';
  isRead?: boolean;
  readAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
