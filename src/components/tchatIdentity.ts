import type { MemberIdentity, TchatDiscussion } from './API/apiManager';

type LooseRecord = Record<string, unknown>;

const directPeerKeys = [
  'peer',
  'peerMember',
  'interlocutor',
  'interlocutorMember',
  'otherMember',
  'other_member',
  'correspondent',
  'member',
];

const openerKeys = [
  'discussionOpener',
  'discussion_opener',
  'opener',
  'openerMember',
  'discussionOpenerMember',
];

const receiverKeys = [
  'discussionReceiver',
  'discussion_receiver',
  'receiver',
  'receiverMember',
  'discussionReceiverMember',
];

const participantsKeys = ['participants', 'members'];

export const getPeerProfileFromDiscussion = (
  discussion: TchatDiscussion,
  currentMemberId: number,
) => {
  const looseDiscussion = discussion as TchatDiscussion & LooseRecord;

  for (const key of directPeerKeys) {
    const peer = normalizeMemberIdentity(looseDiscussion[key]);

    if (peer && peer.id !== currentMemberId) {
      return peer;
    }
  }

  for (const key of openerKeys) {
    const opener = normalizeMemberIdentity(looseDiscussion[key]);

    if (opener && opener.id !== currentMemberId) {
      return opener;
    }
  }

  for (const key of receiverKeys) {
    const receiver = normalizeMemberIdentity(looseDiscussion[key]);

    if (receiver && receiver.id !== currentMemberId) {
      return receiver;
    }
  }

  for (const key of participantsKeys) {
    const participant = findPeerInCollection(
      looseDiscussion[key],
      currentMemberId,
    );

    if (participant) {
      return participant;
    }
  }

  return null;
};

const findPeerInCollection = (value: unknown, currentMemberId: number) => {
  if (!Array.isArray(value)) {
    return null;
  }

  for (const item of value) {
    const peer =
      normalizeMemberIdentity(item) ??
      normalizeMemberIdentity(getRecordValue(item, 'member')) ??
      normalizeMemberIdentity(getRecordValue(item, 'profile'));

    if (peer && peer.id !== currentMemberId) {
      return peer;
    }
  }

  return null;
};

export const normalizeMemberIdentity = (
  value: unknown,
): MemberIdentity | null => {
  if (!isRecord(value)) {
    return null;
  }

  const nestedMember =
    getRecordValue(value, 'member') ?? getRecordValue(value, 'profile');

  if (nestedMember && nestedMember !== value) {
    const nestedIdentity = normalizeMemberIdentity(nestedMember);

    if (nestedIdentity) {
      return nestedIdentity;
    }
  }

  const id = toNumber(
    getRecordValue(value, 'id') ??
      getRecordValue(value, 'memberId') ??
      getRecordValue(value, 'member_id'),
  );
  const fullName = toStringValue(
    getRecordValue(value, 'fullName') ??
      getRecordValue(value, 'full_name') ??
      getRecordValue(value, 'name'),
  );
  const firstname =
    toStringValue(
      getRecordValue(value, 'firstname') ??
        getRecordValue(value, 'firstName') ??
        getRecordValue(value, 'first_name') ??
        getRecordValue(value, 'prenom') ??
        getRecordValue(value, 'forename'),
    ) ?? splitFullName(fullName).firstname;
  const lastname =
    toStringValue(
      getRecordValue(value, 'lastname') ??
        getRecordValue(value, 'lastName') ??
        getRecordValue(value, 'last_name') ??
        getRecordValue(value, 'nom') ??
        getRecordValue(value, 'surname'),
    ) ?? splitFullName(fullName).lastname;

  if (!id || !firstname) {
    return null;
  }

  return {
    id,
    email: toStringValue(getRecordValue(value, 'email')),
    firstname,
    lastname: lastname ?? '',
    avatarUrl:
      toStringValue(
        getRecordValue(value, 'avatarUrl') ??
          getRecordValue(value, 'avatar_url') ??
          getRecordValue(value, 'profilePictureUrl') ??
          getRecordValue(value, 'profile_picture_url') ??
          getRecordValue(value, 'pictureUrl') ??
          getRecordValue(value, 'picture_url') ??
          getRecordValue(value, 'photoUrl') ??
          getRecordValue(value, 'photo_url') ??
          getRecordValue(value, 'avatar'),
      ) ?? null,
  };
};

const splitFullName = (fullName?: string) => {
  if (!fullName) {
    return { firstname: undefined, lastname: undefined };
  }

  const [firstname, ...lastnameParts] = fullName.trim().split(/\s+/);

  return {
    firstname,
    lastname: lastnameParts.join(' ') || undefined,
  };
};

const getRecordValue = (value: unknown, key: string) =>
  isRecord(value) ? value[key] : undefined;

const isRecord = (value: unknown): value is LooseRecord =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const toNumber = (value: unknown) => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
};

const toStringValue = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;
