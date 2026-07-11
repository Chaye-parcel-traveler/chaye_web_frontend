import { z } from 'zod';

const requiredText = (label: string, maxLength = 500) =>
  z
    .string()
    .trim()
    .min(1, `${label} est requis.`)
    .max(maxLength, `${label} est trop long.`);

const positiveNumber = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} est requis.`)
    .transform((value) => Number(value.replace(',', '.')))
    .refine(
      (value) => Number.isFinite(value) && value > 0,
      `${label} doit être supérieur à 0.`,
    );

export const shippingAnnouncementSchema = z.object({
  arrivingAt: requiredText("L'arrivée", 120),
  departingFrom: requiredText('Le départ', 120),
  description: requiredText("La description de l'annonce", 700),
  packageContentDescription: requiredText('Le contenu du colis', 700),
  packageDepthCm: positiveNumber('La profondeur'),
  packageHeightCm: positiveNumber('La hauteur'),
  packageWeightKg: positiveNumber('Le poids du colis'),
  packageWidthCm: positiveNumber('La largeur'),
  price: positiveNumber('Le prix'),
});

export const transportAnnouncementSchema = z.object({
  arrivalAirport: requiredText('Le code IATA arrivée', 10),
  arrivingAt: requiredText("L'aéroport d'arrivée", 120),
  departureAirport: requiredText('Le code IATA départ', 10),
  departingFrom: requiredText("L'aéroport de départ", 120),
  description: requiredText("La description de l'annonce", 700),
  flightArrivalAt: requiredText("L'arrivée du vol", 40),
  flightDepartureAt: requiredText('Le départ du vol', 40),
  price: positiveNumber('Le prix'),
  transportAvailableHeightCm: positiveNumber('La hauteur disponible'),
  transportAvailableWeightKg: positiveNumber('Le poids disponible'),
  transportAvailableWidthCm: positiveNumber('La largeur disponible'),
});

export type ShippingAnnouncementFormInput = z.input<
  typeof shippingAnnouncementSchema
>;
export type ShippingAnnouncementFormOutput = z.output<
  typeof shippingAnnouncementSchema
>;
export type TransportAnnouncementFormInput = z.input<
  typeof transportAnnouncementSchema
>;
export type TransportAnnouncementFormOutput = z.output<
  typeof transportAnnouncementSchema
>;
