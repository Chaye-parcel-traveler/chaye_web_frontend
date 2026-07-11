import { z } from 'zod';

export const reportSchema = z.object({
  reason: z.string().trim().min(1, 'Le motif est obligatoire.'),
  description: z.string().trim().max(1000, 'Description trop longue.'),
});

export const moderationFiltersSchema = z.object({
  status: z.enum(['all', 'open', 'dismissed', 'warned', 'suspended']),
  targetType: z.enum(['all', 'announcement', 'member', 'registration']),
  query: z.string().trim(),
});

export type ReportFormValues = z.infer<typeof reportSchema>;
export type ModerationFiltersFormValues = z.infer<
  typeof moderationFiltersSchema
>;
