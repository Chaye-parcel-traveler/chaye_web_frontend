import { z } from 'zod';

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} est obligatoire.`);

export const loginSchema = z.object({
  email: z.string().trim().email('Email invalide.'),
  password: z.string().min(1, 'Le mot de passe est obligatoire.'),
  remember: z.boolean(),
});

export const registerSchema = z
  .object({
    firstname: requiredText('Le prénom'),
    lastname: requiredText('Le nom'),
    birthDate: requiredText('La date de naissance'),
    country: requiredText('Le pays'),
    address: requiredText("L'adresse"),
    phone: requiredText('Le téléphone'),
    email: z.string().trim().email('Email invalide.'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
    passwordConfirmation: z.string().min(1, 'Confirmez le mot de passe.'),
    termsAccepted: z
      .boolean()
      .refine(
        (value) => value,
        'Vous devez accepter les CGU pour créer un compte.',
      ),
  })
  .refine((value) => value.password === value.passwordConfirmation, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['passwordConfirmation'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
