import { z } from 'zod';
import type { ChecklistItem } from '@/types/database';

export const checklistItemFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150),
  description: z.string().optional(),
  category: z.enum(['documents', 'booking', 'insurance', 'money', 'general']).default('general'),
  status: z.enum(['todo', 'in_progress', 'completed']).default('todo'),
});

export type ChecklistItemFormData = z.infer<typeof checklistItemFormSchema>;
export type ChecklistFilter = 'all' | 'todo' | 'in_progress' | 'completed';

export interface ChecklistProgress {
  total: number;
  completed: number;
  percentage: number;
}
