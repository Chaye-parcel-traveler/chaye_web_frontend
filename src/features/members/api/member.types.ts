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
