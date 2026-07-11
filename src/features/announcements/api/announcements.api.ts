import { apiRequest } from '../../../shared/api/request';
import { getAuthToken } from '../../auth/api/auth.api';

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
  | CreateShippingAnnouncementPayload
  | CreateTransportAnnouncementPayload;

export const getAnnouncements = () =>
  apiRequest<Announcement[]>('/announcements', {
    method: 'GET',
  });

export const createAnnouncement = (payload: CreateAnnouncementPayload) =>
  apiRequest<Announcement>('/announcements', {
    method: 'POST',
    auth: true,
    getAuthToken,
    body: payload,
  });
