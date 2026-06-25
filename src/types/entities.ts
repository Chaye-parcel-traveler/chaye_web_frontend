export type MemberStatus = 'active' | 'suspended' | 'banned';

export type Member = {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  picture?: string;
  status?: MemberStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type AnnouncementType = 'send' | 'carry' | string;

export type Announcement = {
  id: number;
  title?: string;
  description?: string;
  departingFrom?: string;
  arrivingAt?: string;
  weightAvailability?: number;
  type?: AnnouncementType;
  memberId?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Package = {
  id: number;
  name?: string;
  description?: string;
  weight?: number;
  departureAddress?: string;
  arrivalAddress?: string;
  memberId?: number;
  createdAt?: string;
  updatedAt?: string;
};
