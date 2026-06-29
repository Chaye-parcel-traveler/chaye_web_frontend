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
