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

export type AnnouncementType = 'send' | 'carry' | string;

export type Announcement = {
  id?: number | string;
  _id?: number | string;
  title?: string;
  description?: string;
  departingFrom?: string;
  arrivingAt?: string;
  arriving_at?: string;
  weightAvailability?: number | string;
  weight_availability?: number | string;
  price?: number | string;
  destination?: string;
  priceKilo?: number | string;
  departureDate?: string;
  arrivalDate?: string;
  type?: AnnouncementType;
  memberId?: number | string;
  createdAt?: string;
  updatedAt?: string;
};

export type Package = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  description?: string;
  content?: string;
  weight?: number | string;
  size?: number | string;
  picture?: string;
  departureCity?: string;
  departureAddress?: string;
  arrivalAddress?: string;
  memberId?: number | string;
  creationDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Comment = {
  id?: number | string;
  memberId?: number | string;
  announcementId?: number | string;
  ratingStars?: number;
  content?: string;
  creationDate?: string;
};

export type Message = {
  id?: number | string;
  memberId?: number | string;
  sender: string;
  recipient: string;
  message: string;
  datetime: string;
};
