import { describe, expect, it } from 'vitest';
import {
  shippingAnnouncementSchema,
  transportAnnouncementSchema,
} from './announcement.schemas';

describe('announcement schemas', () => {
  it('normalizes a valid shipping announcement payload', () => {
    const result = shippingAnnouncementSchema.parse({
      arrivingAt: 'Fort-de-France',
      departingFrom: 'Paris-Orly',
      description: 'Je souhaite envoyer un colis.',
      packageContentDescription: 'Documents administratifs',
      packageDepthCm: '10',
      packageHeightCm: '30',
      packageWeightKg: '2,5',
      packageWidthCm: '20',
      price: '15',
    });

    expect(result.packageWeightKg).toBe(2.5);
    expect(result.price).toBe(15);
  });

  it('rejects missing required transport flight fields', () => {
    const result = transportAnnouncementSchema.safeParse({
      arrivalAirport: 'FDF',
      arrivingAt: 'Aéroport Martinique Aimé Césaire',
      departureAirport: 'ORY',
      departingFrom: 'Paris-Orly',
      description: 'Je peux transporter un colis.',
      flightArrivalAt: '',
      flightDepartureAt: '',
      price: '80',
      transportAvailableHeightCm: '50',
      transportAvailableWeightKg: '12',
      transportAvailableWidthCm: '40',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path.join('.'))).toEqual(
      expect.arrayContaining(['flightDepartureAt', 'flightArrivalAt']),
    );
  });
});
