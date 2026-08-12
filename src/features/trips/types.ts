import { z } from 'zod';
import type { Trip } from '@/types/database';

export const tripFormSchema = z.object({
  title: z.string().min(1, 'Trip title is required').max(100, 'Title is too long'),
  destination: z.string().min(1, 'Destination is required'),
  country_code: z.string().length(2, 'Country code must be 2 characters (e.g. JP)'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  cover_image_url: z.string().nullable().optional(),
});

export type TripFormData = z.infer<typeof tripFormSchema>;

export interface TripWithStats extends Trip {
  total_checklist_items?: number;
  completed_checklist_items?: number;
  total_budget?: number;
}

export type TripFilter = 'all' | 'upcoming' | 'past';
