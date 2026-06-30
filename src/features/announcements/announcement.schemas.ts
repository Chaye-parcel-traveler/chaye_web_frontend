import { z } from 'zod';

export const announcementFormSchema = z.object({
  departingFrom: z.string().trim().min(1, 'Le lieu de départ est requis.'),
  arrivingAt: z.string().trim().min(1, "Le lieu d'arrivée est requis."),
  description: z.string().trim().min(1, 'La description est requise.').max(512),
  weightAvailability: z.coerce
    .number('Saisissez un poids valide.')
    .min(0, 'Le poids ne peut pas être négatif.')
    .max(32, 'Le poids disponible ne peut pas dépasser 32 kg.'),
  price: z.coerce
    .number('Saisissez un prix valide.')
    .min(1, 'Le prix doit être supérieur ou égal à 1.')
    .max(150, 'Le prix ne peut pas dépasser 150.'),
});

export const createAnnouncementPayloadSchema = announcementFormSchema.extend({
  type: z.literal('shipping'),
});

export type AnnouncementFormValues = z.input<typeof announcementFormSchema>;
export type AnnouncementFormOutput = z.output<typeof announcementFormSchema>;
export type CreateAnnouncementPayload = z.output<
  typeof createAnnouncementPayloadSchema
>;
