import { z } from 'zod';

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de la date : YYYY-MM-DD.');

export const createJournalEntrySchema = z.object({
  date: dateOnly.optional(), 
  humeur: z.number().int().min(1).max(10),
  energie: z.number().int().min(1).max(10),
  sommeil: z.number().int().min(0).max(24),
  anxiete: z.number().int().min(1).max(10),
  evenements: z.string().max(2000).optional(),
  gratitude: z.string().max(2000).optional(),
  activityIds: z.array(z.number().int()).optional(),
});

export const journalDateParamSchema = z.object({
  date: dateOnly,
});

export const journalListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const journalStatsQuerySchema = z.object({
  range: z.string().regex(/^\d+d$/, 'Format attendu: ex. 30d').default('30d'),
});