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

export const packageDraftSchema = z.object({
  arrivingAt: requiredText("Le lieu d'arrivée", 120),
  departingFrom: requiredText('Le lieu de départ', 120),
  description: requiredText('Le contenu du colis', 700),
  packageDepthCm: positiveNumber('La profondeur'),
  packageHeightCm: positiveNumber('La hauteur'),
  packageWeightKg: positiveNumber('Le poids'),
  packageWidthCm: positiveNumber('La largeur'),
  price: positiveNumber('Le prix'),
  shippingLimitDate: requiredText("La date limite d'expédition", 40),
});

export type PackageDraftFormInput = z.input<typeof packageDraftSchema>;
export type PackageDraftFormOutput = z.output<typeof packageDraftSchema>;
