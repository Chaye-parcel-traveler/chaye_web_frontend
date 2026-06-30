import { z } from 'zod';

const requiredText = (message: string) => z.string().trim().min(1, message);

export const newPackageSchema = z.object({
  departingFrom: requiredText('Le lieu de départ est requis.'),
  arrivingAt: requiredText("Le lieu d'arrivée est requis."),
  description: requiredText('Le contenu du colis est requis.'),
  weight: z.coerce.number().positive('Le poids doit être positif.'),
  length: z.coerce.number().positive('La longueur doit être positive.'),
  width: z.coerce.number().positive('La largeur doit être positive.'),
  depth: z.coerce.number().positive('La profondeur doit être positive.'),
  price: z.coerce.number().positive('Le prix doit être positif.'),
  shippingLimitDate: z
    .string()
    .min(1, "La date limite d'expédition est requise."),
});

export const editPackageSchema = z.object({
  content: requiredText('Le contenu du colis est requis.'),
  weight: z.coerce.number().positive('Le poids doit être positif.'),
  size: requiredText('La taille est requise.'),
  departureCity: requiredText('La ville de départ est requise.'),
  picture: z.string(),
  file: z.instanceof(File).optional(),
});

export type NewPackageValues = z.input<typeof newPackageSchema>;
export type NewPackageOutput = z.output<typeof newPackageSchema>;
export type EditPackageValues = z.input<typeof editPackageSchema>;
export type EditPackageOutput = z.output<typeof editPackageSchema>;
