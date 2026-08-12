import { z } from 'zod';
import type { BudgetCategory } from '@/lib/constants';

export const budgetEntryFormSchema = z.object({
  category: z.enum(['flights', 'accommodation', 'food', 'transportation', 'activities', 'other']),
  label: z.string().min(1, 'Description label is required').max(100),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  currency: z.string().default('PHP'),
});

export type BudgetEntryFormData = z.infer<typeof budgetEntryFormSchema>;

export interface CategoryBreakdown {
  category: BudgetCategory;
  label: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BudgetSummary {
  total: number;
  breakdown: CategoryBreakdown[];
}
