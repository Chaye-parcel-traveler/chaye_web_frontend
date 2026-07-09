import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { MemberProfile } from './apiManager';

const requestMock = vi.fn();
const persistAuthTokenMock = vi.fn();
const clearAuthTokenMock = vi.fn();
const getStoredAuthTokenMock = vi.fn<() => string | null>();

vi.mock('../../lib/api-client', () => ({
  default: {
    request: requestMock,
  },
  clearAuthToken: clearAuthTokenMock,
  getStoredAuthToken: getStoredAuthTokenMock,
  normalizeApiError: (error: unknown) => ({
    message:
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error && 'message' in error
          ? String(error.message)
          : 'Une erreur est survenue.',
  }),
  persistAuthToken: persistAuthTokenMock,
}));

const memberResponse = {
  data: {
    id: 7,
    email: 'lea@example.test',
    first_name: 'Léa',
    last_name: 'Martin',
    address: '1 rue Test',
    phone_number: '+596000000000',
    birth_date: '1990-01-01',
    role: 'member',
    status: 'active',
    is_admin: true,
  },
};

const expectedMember: MemberProfile = {
  id: 7,
  email: 'lea@example.test',
  firstname: 'Léa',
  lastname: 'Martin',
  avatarUrl: null,
  address: '1 rue Test',
  phone: '+596000000000',
  birthDate: '1990-01-01',
  role: 'member',
  status: 'active',
  isAdmin: true,
};

describe('apiManager', () => {
  beforeEach(() => {
    requestMock.mockReset();
    persistAuthTokenMock.mockReset();
    clearAuthTokenMock.mockReset();
    getStoredAuthTokenMock.mockReset();
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs in through the shared API client and stores the normalized session', async () => {
    const authResponse = {
      type: 'bearer',
      name: null,
      token: 'session-token',
      abilities: [],
      lastUsedAt: null,
      expiresAt: null,
    };

    requestMock
      .mockResolvedValueOnce({ data: authResponse })
      .mockResolvedValueOnce({ data: memberResponse });

    const { getStoredMember, loginMember } = await import('./apiManager');

    await expect(
      loginMember('lea@example.test', 'ChayeDemo2026!')
    ).resolves.toEqual({
      token: 'session-token',
      member: expectedMember,
    });

    expect(requestMock).toHaveBeenNthCalledWith(1, {
      data: new URLSearchParams({
        email: 'lea@example.test',
        password: 'ChayeDemo2026!',
      }),
      headers: {
        Accept: 'application/json',
      },
      method: 'POST',
      url: '/login',
    });
    expect(requestMock).toHaveBeenNthCalledWith(2, {
      data: undefined,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer session-token',
      },
      method: 'GET',
      url: '/me',
    });
    expect(persistAuthTokenMock).toHaveBeenCalledWith('session-token');
    expect(getStoredMember()).toEqual(expectedMember);
    expect(window.localStorage.getItem('chaye_account_status')).toBe('active');
  });

  it('uses the shared stored token for authenticated legacy requests', async () => {
    getStoredAuthTokenMock.mockReturnValue('stored-token');
    requestMock.mockResolvedValueOnce({
      data: {
        id: 12,
        type: 'transport',
        description: 'Bagage disponible',
      },
    });

    const { createAnnouncement } = await import('./apiManager');

    await createAnnouncement({
      type: 'transport',
      description: 'Bagage disponible',
      departingFrom: 'Fort-de-France',
      arrivingAt: 'Paris',
      transportAvailableWeightKg: 12,
      transportAvailableHeightCm: 40,
      transportAvailableWidthCm: 30,
      price: 80,
    });

    expect(requestMock).toHaveBeenCalledWith({
      data: {
        type: 'transport',
        description: 'Bagage disponible',
        departingFrom: 'Fort-de-France',
        arrivingAt: 'Paris',
        transportAvailableWeightKg: 12,
        transportAvailableHeightCm: 40,
        transportAvailableWidthCm: 30,
        price: 80,
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer stored-token',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/announcements',
    });
  });

  it('rejects authenticated legacy requests when no shared token is stored', async () => {
    getStoredAuthTokenMock.mockReturnValue(null);

    const { getCurrentMember } = await import('./apiManager');

    await expect(getCurrentMember()).rejects.toThrow(
      'Vous devez être connecté pour effectuer cette action.'
    );
    expect(requestMock).not.toHaveBeenCalled();
  });

  it('normalizes discussion payload variants from the backend', async () => {
    getStoredAuthTokenMock.mockReturnValue('stored-token');
    requestMock.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: '5',
            discussion_opener_id: '7',
            discussion_receiver_id: 8,
            opener: { id: 7, full_name: 'Léa Martin' },
            other_member: { id: '8', firstname: 'Noah', lastname: 'Pierre' },
            last_message: {
              id: '9',
              discussion_id: '5',
              member_id: '8',
              content: 'Bonjour',
              is_read: '0',
            },
            has_unread_messages: '1',
            unread_count: '3',
          },
        ],
      },
    });

    const { getDiscussions } = await import('./apiManager');

    await expect(getDiscussions()).resolves.toMatchObject([
      {
        id: 5,
        discussionOpenerId: 7,
        discussionReceiverId: 8,
        discussionOpener: {
          id: 7,
          firstname: 'Léa',
          lastname: 'Martin',
        },
        peer: {
          id: 8,
          firstname: 'Noah',
          lastname: 'Pierre',
        },
        lastMessage: {
          id: 9,
          discussionId: 5,
          memberId: 8,
          content: 'Bonjour',
          isRead: false,
        },
        hasUnreadMessages: true,
        unreadCount: 3,
      },
    ]);
  });

  it('clears the shared token and member session on logout', async () => {
    const { logoutMember, saveAuthSession } = await import('./apiManager');

    saveAuthSession({ token: 'session-token', member: expectedMember });
    logoutMember();

    expect(clearAuthTokenMock).toHaveBeenCalled();
    expect(window.localStorage.getItem('chaye_auth_member')).toBeNull();
    expect(window.localStorage.getItem('chaye_account_status')).toBeNull();
  });

  it('computes ages and minor status at the legal boundary', async () => {
    const { getAge, isMinorFromBirthDate } = await import('./apiManager');

    expect(getAge('2008-07-10', new Date('2026-07-09T12:00:00'))).toBe(17);
    expect(getAge('2008-07-09', new Date('2026-07-09T12:00:00'))).toBe(18);
    expect(getAge('not-a-date')).toBeNull();
    expect(isMinorFromBirthDate('2010-01-01')).toBe(true);
  });
});
