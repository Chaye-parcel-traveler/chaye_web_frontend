const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST';

type RequestOptions = {
  auth?: boolean;
  body?: BodyInit | Record<string, unknown>;
  headers?: Record<string, string>;
  method: HttpMethod;
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
  'open' | 'dismissed' | 'warned' | 'suspended';

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

export type MemberProfile = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string | null;
  address: string;
  phone: string;
  birthDate: string;
  role: string;
  status: AccountStatus;
  isAdmin: boolean;
};

export type MemberIdentity = {
  id: number;
  email?: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string | null;
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

export type Announcement = {
  id: number;
  type: string;
  description: string;
  departingFrom: string;
  arrivingAt: string;
  weightAvailability: number;
  packageWeightKg?: number | null;
  packageHeightCm?: number | null;
  packageWidthCm?: number | null;
  packageDepthCm?: number | null;
  transportAvailableWeightKg?: number | null;
  transportAvailableHeightCm?: number | null;
  transportAvailableWidthCm?: number | null;
  departureAirport?: string | null;
  arrivalAirport?: string | null;
  price: number;
  memberId: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateShippingAnnouncementPayload = {
  type: 'shipping';
  description: string;
  departingFrom: string;
  arrivingAt: string;
  packageWeightKg: number;
  packageHeightCm: number;
  packageWidthCm: number;
  packageDepthCm: number;
  packageContentDescription?: string;
  price: number;
};

export type CreateTransportAnnouncementPayload = {
  type: 'transport';
  description: string;
  departingFrom: string;
  arrivingAt: string;
  transportAvailableWeightKg: number;
  transportAvailableHeightCm: number;
  transportAvailableWidthCm: number;
  travelTicketPictureUrl?: string;
  flightDepartureAt?: string;
  flightArrivalAt?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  price: number;
};

export type CreateAnnouncementPayload =
  CreateShippingAnnouncementPayload | CreateTransportAnnouncementPayload;

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

const AUTH_TOKEN_KEY = 'chaye_auth_token';
const AUTH_MEMBER_KEY = 'chaye_auth_member';
const AUTH_EVENT = 'chaye-auth-changed';

const parseStoredMember = () => {
  const rawMember = window.localStorage.getItem(AUTH_MEMBER_KEY);

  if (!rawMember) {
    return null;
  }

  try {
    return JSON.parse(rawMember) as MemberProfile;
  } catch {
    window.localStorage.removeItem(AUTH_MEMBER_KEY);
    return null;
  }
};

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const request = async <T>(
  path: string,
  options: RequestOptions
): Promise<T> => {
  const headers = new Headers({
    Accept: 'application/json',
    ...options.headers,
  });

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof URLSearchParams)
  ) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.auth) {
    if (!headers.has('Authorization')) {
      const token = getAuthToken();

      if (!token) {
        throw new Error(
          'Vous devez être connecté pour effectuer cette action.'
        );
      }

      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method,
    headers,
    body:
      options.body &&
      !(options.body instanceof FormData) &&
      !(options.body instanceof URLSearchParams)
        ? JSON.stringify(options.body)
        : options.body,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload?.message ??
      payload?.error ??
      payload?.errors?.[0]?.message ??
      'La requête a échoué.';
    throw new Error(message);
  }

  return response.json().catch(() => undefined as T);
};

type LooseRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is LooseRecord =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const getValue = (value: unknown, key: string) =>
  isRecord(value) ? value[key] : undefined;

const unwrapValue = (value: unknown, keys: string[]) => {
  if (!isRecord(value)) {
    return value;
  }

  for (const key of keys) {
    const nestedValue = getValue(value, key);

    if (nestedValue) {
      return nestedValue;
    }
  }

  return value;
};

const unwrapArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value;
  }

  const data = getValue(value, 'data');

  return Array.isArray(data) ? data : [];
};

const toNumber = (value: unknown) => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
};

const toStringValue = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

const toBoolean = (value: unknown) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value === 1 || value === '1') {
    return true;
  }

  if (value === 0 || value === '0') {
    return false;
  }

  return undefined;
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

const normalizeMemberIdentity = (value: unknown): MemberIdentity | null => {
  const unwrappedValue = unwrapValue(value, ['data', 'member', 'profile']);

  if (!isRecord(unwrappedValue)) {
    return null;
  }

  const nestedMember =
    getValue(unwrappedValue, 'member') ?? getValue(unwrappedValue, 'profile');

  if (nestedMember && nestedMember !== unwrappedValue) {
    const nestedIdentity = normalizeMemberIdentity(nestedMember);

    if (nestedIdentity) {
      return nestedIdentity;
    }
  }

  const fullName = toStringValue(
    getValue(unwrappedValue, 'fullName') ??
      getValue(unwrappedValue, 'full_name') ??
      getValue(unwrappedValue, 'name')
  );
  const splitName = splitFullName(fullName);
  const id = toNumber(
    getValue(unwrappedValue, 'id') ??
      getValue(unwrappedValue, 'memberId') ??
      getValue(unwrappedValue, 'member_id')
  );
  const firstname =
    toStringValue(
      getValue(unwrappedValue, 'firstname') ??
        getValue(unwrappedValue, 'firstName') ??
        getValue(unwrappedValue, 'first_name') ??
        getValue(unwrappedValue, 'prenom') ??
        getValue(unwrappedValue, 'forename')
    ) ?? splitName.firstname;
  const lastname =
    toStringValue(
      getValue(unwrappedValue, 'lastname') ??
        getValue(unwrappedValue, 'lastName') ??
        getValue(unwrappedValue, 'last_name') ??
        getValue(unwrappedValue, 'nom') ??
        getValue(unwrappedValue, 'surname')
    ) ?? splitName.lastname;

  if (!id || !firstname) {
    return null;
  }

  return {
    id,
    email: toStringValue(getValue(unwrappedValue, 'email')),
    firstname,
    lastname: lastname ?? '',
    avatarUrl:
      toStringValue(
        getValue(unwrappedValue, 'avatarUrl') ??
          getValue(unwrappedValue, 'avatar_url') ??
          getValue(unwrappedValue, 'profilePictureUrl') ??
          getValue(unwrappedValue, 'profile_picture_url') ??
          getValue(unwrappedValue, 'pictureUrl') ??
          getValue(unwrappedValue, 'picture_url') ??
          getValue(unwrappedValue, 'photoUrl') ??
          getValue(unwrappedValue, 'photo_url') ??
          getValue(unwrappedValue, 'avatar')
      ) ?? null,
  };
};

const normalizeMemberProfile = (value: unknown): MemberProfile => {
  const unwrappedValue = unwrapValue(value, ['data', 'member', 'profile']);
  const identity = normalizeMemberIdentity(unwrappedValue);
  const looseValue = isRecord(unwrappedValue) ? unwrappedValue : {};

  return {
    id: identity?.id ?? toNumber(getValue(looseValue, 'id')) ?? 0,
    email:
      identity?.email ?? toStringValue(getValue(looseValue, 'email')) ?? '',
    firstname:
      identity?.firstname ??
      toStringValue(getValue(looseValue, 'firstname')) ??
      '',
    lastname:
      identity?.lastname ??
      toStringValue(getValue(looseValue, 'lastname')) ??
      '',
    avatarUrl: identity?.avatarUrl ?? null,
    address:
      toStringValue(
        getValue(looseValue, 'address') ?? getValue(looseValue, 'adresse')
      ) ?? '',
    phone:
      toStringValue(
        getValue(looseValue, 'phone') ??
          getValue(looseValue, 'phoneNumber') ??
          getValue(looseValue, 'phone_number')
      ) ?? '',
    birthDate:
      toStringValue(
        getValue(looseValue, 'birthDate') ??
          getValue(looseValue, 'birth_date') ??
          getValue(looseValue, 'dateOfBirth') ??
          getValue(looseValue, 'date_of_birth')
      ) ?? '',
    role: toStringValue(getValue(looseValue, 'role')) ?? 'member',
    status:
      (toStringValue(getValue(looseValue, 'status')) as
        AccountStatus | undefined) ?? 'active',
    isAdmin:
      toBoolean(
        getValue(looseValue, 'isAdmin') ??
          getValue(looseValue, 'is_admin') ??
          getValue(looseValue, 'admin')
      ) ?? false,
  };
};

const normalizeTchatDiscussion = (value: unknown): TchatDiscussion => {
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
        getValue(looseValue, 'opener_id')
    ) ?? 0;
  const receiverId =
    toNumber(
      getValue(looseValue, 'discussionReceiverId') ??
        getValue(looseValue, 'discussion_receiver_id') ??
        getValue(looseValue, 'receiverId') ??
        getValue(looseValue, 'receiver_id')
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
          getValue(looseValue, 'opener_member')
      ) ?? undefined,
    discussionReceiver:
      normalizeMemberIdentity(
        getValue(looseValue, 'discussionReceiver') ??
          getValue(looseValue, 'discussion_receiver') ??
          getValue(looseValue, 'receiver') ??
          getValue(looseValue, 'receiverMember') ??
          getValue(looseValue, 'receiver_member')
      ) ?? undefined,
    peer:
      normalizeMemberIdentity(
        getValue(looseValue, 'peer') ??
          getValue(looseValue, 'peerMember') ??
          getValue(looseValue, 'peer_member') ??
          getValue(looseValue, 'interlocutor') ??
          getValue(looseValue, 'interlocutorMember') ??
          getValue(looseValue, 'otherMember') ??
          getValue(looseValue, 'other_member')
      ) ?? undefined,
    lastMessage:
      normalizeNullableTchatMessage(
        getValue(looseValue, 'lastMessage') ??
          getValue(looseValue, 'last_message') ??
          getValue(looseValue, 'latestMessage') ??
          getValue(looseValue, 'latest_message')
      ) ?? null,
    hasUnreadMessages: toBoolean(
      getValue(looseValue, 'hasUnreadMessages') ??
        getValue(looseValue, 'has_unread_messages')
    ),
    unreadCount:
      toNumber(
        getValue(looseValue, 'unreadCount') ??
          getValue(looseValue, 'unread_count')
      ) ?? undefined,
    unreadMessagesCount:
      toNumber(
        getValue(looseValue, 'unreadMessagesCount') ??
          getValue(looseValue, 'unread_messages_count')
      ) ?? undefined,
    createdAt:
      toStringValue(
        getValue(looseValue, 'createdAt') ?? getValue(looseValue, 'created_at')
      ) ?? undefined,
    updatedAt:
      toStringValue(
        getValue(looseValue, 'updatedAt') ?? getValue(looseValue, 'updated_at')
      ) ?? undefined,
  };
};

const normalizeTchatMessage = (value: unknown): TchatMessage => {
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
          getValue(looseValue, 'discussion_id')
      ) ?? 0,
    memberId:
      toNumber(
        getValue(looseValue, 'memberId') ?? getValue(looseValue, 'member_id')
      ) ?? 0,
    content: toStringValue(getValue(looseValue, 'content')) ?? '',
    deliveryStatus:
      (toStringValue(
        getValue(looseValue, 'deliveryStatus') ??
          getValue(looseValue, 'delivery_status')
      ) as TchatMessage['deliveryStatus']) ?? undefined,
    isRead: toBoolean(
      getValue(looseValue, 'isRead') ?? getValue(looseValue, 'is_read')
    ),
    readAt:
      toStringValue(
        getValue(looseValue, 'readAt') ?? getValue(looseValue, 'read_at')
      ) ?? null,
    createdAt:
      toStringValue(
        getValue(looseValue, 'createdAt') ?? getValue(looseValue, 'created_at')
      ) ?? undefined,
    updatedAt:
      toStringValue(
        getValue(looseValue, 'updatedAt') ?? getValue(looseValue, 'updated_at')
      ) ?? undefined,
  };
};

const normalizeNullableTchatMessage = (value: unknown) => {
  if (!value) {
    return null;
  }

  return normalizeTchatMessage(value);
};

export const getAuthToken = () => window.localStorage.getItem(AUTH_TOKEN_KEY);

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
  window.localStorage.setItem(AUTH_TOKEN_KEY, session.token);
  window.localStorage.setItem(AUTH_MEMBER_KEY, JSON.stringify(session.member));
  window.localStorage.setItem('chaye_account_status', session.member.status);
  window.localStorage.setItem('chaye_account_status_reason', '');
  emitAuthChange();
};

export const clearAuthSession = () => {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_MEMBER_KEY);
  window.localStorage.removeItem('chaye_account_status');
  window.localStorage.removeItem('chaye_account_status_reason');
  emitAuthChange();
};

export const onAuthChange = (callback: () => void) => {
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
};

export const registerMember = (payload: RegisterPayload) =>
  request('/members', {
    method: 'POST',
    body: payload,
  });

export const loginMember = async (email: string, password: string) => {
  const auth = await request<AuthResponse>('/login', {
    method: 'POST',
    body: new URLSearchParams({ email, password }),
  });
  const member = normalizeMemberProfile(
    await request<unknown>('/me', {
      method: 'GET',
      auth: true,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
  );

  const session = { token: auth.token, member };
  saveAuthSession(session);
  return session;
};

export const logoutMember = () => clearAuthSession();

export const getCurrentMember = async () => {
  const member = normalizeMemberProfile(
    await request<unknown>('/me', {
      method: 'GET',
      auth: true,
    })
  );

  const token = getAuthToken();
  if (token) {
    saveAuthSession({ token, member });
  }

  return member;
};

export const getMember = (memberId: number) =>
  request<unknown>(`/members/${memberId}`, {
    method: 'GET',
    auth: true,
  }).then(normalizeMemberProfile);

export const getAnnouncements = () =>
  request<Announcement[]>('/announcements', {
    method: 'GET',
  });

export const createAnnouncement = (payload: CreateAnnouncementPayload) =>
  request<Announcement>('/announcements', {
    method: 'POST',
    auth: true,
    body: payload,
  });

export const getDiscussions = () =>
  request<unknown>('/tchat-discussions', {
    method: 'GET',
    auth: true,
  }).then((discussions) =>
    unwrapArray(discussions).map(normalizeTchatDiscussion)
  );

export const getDiscussion = (discussionId: number) =>
  request<unknown>(`/tchat-discussions/${discussionId}`, {
    method: 'GET',
    auth: true,
  }).then(normalizeTchatDiscussion);

export const createDiscussion = (discussionReceiverId: number) =>
  request<unknown>('/tchat-discussions', {
    method: 'POST',
    auth: true,
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
          discussion.discussionOpenerId === otherMemberId)
    );

    if (existingDiscussion) {
      return existingDiscussion;
    }
  }

  return createDiscussion(otherMemberId);
};

export const getDiscussionMessages = (discussionId: number) =>
  request<unknown>(`/tchat-discussions/${discussionId}/messages`, {
    method: 'GET',
    auth: true,
  }).then((messages) => unwrapArray(messages).map(normalizeTchatMessage));

export const sendDiscussionMessage = (discussionId: number, content: string) =>
  request<unknown>(`/tchat-discussions/${discussionId}/messages`, {
    method: 'POST',
    auth: true,
    body: { content },
  }).then(normalizeTchatMessage);

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

export const getCurrentAccountStatus = async () => {
  const member = await getCurrentMember();

  return {
    status: member.status,
    reason: '',
  } satisfies AccountStatusResponse;
};

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
