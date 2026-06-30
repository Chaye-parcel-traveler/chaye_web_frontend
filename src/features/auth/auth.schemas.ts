import { z } from 'zod';

const requiredText = (label: string, maxLength: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} est requis.`)
    .max(maxLength, `${label} est trop long.`);

export const loginSchema = z.object({
  email: z.email('Saisissez une adresse e-mail valide.').max(255),
  password: z.string().min(8, 'Le mot de passe doit contenir 8 caractères.'),
});

export const signupSchema = z.object({
  firstname: requiredText('Le prénom', 40),
  lastname: requiredText('Le nom', 60),
  address: requiredText("L'adresse", 220),
  phone: requiredText('Le téléphone', 30),
  birthDate: z
    .string()
    .min(1, 'La date de naissance est requise.')
    .refine(
      (value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()),
      'Saisissez une date de naissance valide.'
    ),
  email: z.email('Saisissez une adresse e-mail valide.').max(255),
  password: z.string().min(8, 'Le mot de passe doit contenir 8 caractères.'),
  acceptsCgu: z.literal(true, {
    error: 'Vous devez accepter les conditions générales.',
  }),
});

export const createMemberPayloadSchema = signupSchema
  .omit({ acceptsCgu: true })
  .extend({
    acceptedCguVersion: z
      .string()
      .trim()
      .min(1, "La version des conditions générales n'est pas configurée.")
      .max(50),
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type CreateMemberPayload = z.infer<typeof createMemberPayloadSchema>;
