import {
  getValue,
  isRecord,
  toBoolean,
  toNumber,
  toStringValue,
  unwrapValue,
} from '../../../shared/api/normalizers';
import type {
  AccountStatus,
  MemberIdentity,
  MemberProfile,
} from './member.types';

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

export const normalizeMemberIdentity = (
  value: unknown,
): MemberIdentity | null => {
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
      getValue(unwrappedValue, 'name'),
  );
  const splitName = splitFullName(fullName);
  const id = toNumber(
    getValue(unwrappedValue, 'id') ??
      getValue(unwrappedValue, 'memberId') ??
      getValue(unwrappedValue, 'member_id'),
  );
  const firstname =
    toStringValue(
      getValue(unwrappedValue, 'firstname') ??
        getValue(unwrappedValue, 'firstName') ??
        getValue(unwrappedValue, 'first_name') ??
        getValue(unwrappedValue, 'prenom') ??
        getValue(unwrappedValue, 'forename'),
    ) ?? splitName.firstname;
  const lastname =
    toStringValue(
      getValue(unwrappedValue, 'lastname') ??
        getValue(unwrappedValue, 'lastName') ??
        getValue(unwrappedValue, 'last_name') ??
        getValue(unwrappedValue, 'nom') ??
        getValue(unwrappedValue, 'surname'),
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
          getValue(unwrappedValue, 'avatar'),
      ) ?? null,
  };
};

export const normalizeMemberProfile = (value: unknown): MemberProfile => {
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
        getValue(looseValue, 'address') ?? getValue(looseValue, 'adresse'),
      ) ?? '',
    phone:
      toStringValue(
        getValue(looseValue, 'phone') ??
          getValue(looseValue, 'phoneNumber') ??
          getValue(looseValue, 'phone_number'),
      ) ?? '',
    birthDate:
      toStringValue(
        getValue(looseValue, 'birthDate') ??
          getValue(looseValue, 'birth_date') ??
          getValue(looseValue, 'dateOfBirth') ??
          getValue(looseValue, 'date_of_birth'),
      ) ?? '',
    role: toStringValue(getValue(looseValue, 'role')) ?? 'member',
    status:
      (toStringValue(getValue(looseValue, 'status')) as
        | AccountStatus
        | undefined) ?? 'active',
    isAdmin:
      toBoolean(
        getValue(looseValue, 'isAdmin') ??
          getValue(looseValue, 'is_admin') ??
          getValue(looseValue, 'admin'),
      ) ?? false,
  };
};
