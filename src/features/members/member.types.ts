export type MemberStatus = 'active' | 'suspended' | 'banned';

export type Member = {
  id?: number | string;
  _id?: number | string;
  firstName?: string;
  lastName?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: string;
  adress?: string;
  phone?: string;
  phoneNumber?: string;
  picture?: string;
  imagename?: string;
  status?: MemberStatus;
  createdAt?: string;
  updatedAt?: string;
};
