import { describe, expect, it } from 'vitest';
import {
  normalizeMemberIdentity,
  normalizeMemberProfile,
} from './member.normalizers';

describe('member normalizers', () => {
  it('normalizes identity from nested API shapes and alternative field names', () => {
    expect(
      normalizeMemberIdentity({
        data: {
          member_id: '15',
          full_name: 'Fatou Bernard',
          profile_picture_url: 'https://example.test/avatar.jpg',
        },
      }),
    ).toEqual({
      avatarUrl: 'https://example.test/avatar.jpg',
      email: undefined,
      firstname: 'Fatou',
      id: 15,
      lastname: 'Bernard',
    });
  });

  it('returns null when identity has no usable id or firstname', () => {
    expect(
      normalizeMemberIdentity({ email: 'unknown@example.test' }),
    ).toBeNull();
  });

  it('normalizes member profile defaults', () => {
    expect(
      normalizeMemberProfile({
        data: {
          admin: '1',
          birth_date: '1990-01-01',
          email: 'codex@chaye.test',
          first_name: 'Codex',
          id: 61,
          last_name: 'Agent',
          phone_number: '+33610000001',
        },
      }),
    ).toMatchObject({
      birthDate: '1990-01-01',
      email: 'codex@chaye.test',
      firstname: 'Codex',
      id: 61,
      isAdmin: true,
      lastname: 'Agent',
      phone: '+33610000001',
      role: 'member',
      status: 'active',
    });
  });
});
