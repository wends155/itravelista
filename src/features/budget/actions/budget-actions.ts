'use server';

import { createClient } from '@/lib/supabase/server';
import { ok, err, Result } from '@/lib/errors';
import type { BudgetEntry } from '@/types/database';
import { BudgetEntryFormData, budgetEntryFormSchema } from '../types';
import { getBudgetTemplate } from '../templates/budget-templates';

export async function getBudgetEntries(tripId: string): Promise<Result<BudgetEntry[]>> {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('budget_entry')
      .select('*')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true });

    if (error) {
      return err('BUDGET_FETCH_FAILED', error.message);
    }

    return ok((data as BudgetEntry[]) || []);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to fetch budget entries';
    return err('BUDGET_FETCH_FAILED', message);
  }
}

export async function createBudgetEntry(
  tripId: string,
  formData: BudgetEntryFormData
): Promise<Result<BudgetEntry>> {
  const validation = budgetEntryFormSchema.safeParse(formData);
  if (!validation.success) {
    return err('VALIDATION_ERROR', validation.error.issues[0]?.message || 'Invalid form data');
  }

  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('budget_entry')
      .insert({
        trip_id: tripId,
        category: formData.category,
        label: formData.label,
        amount: formData.amount,
        currency: formData.currency || 'PHP',
      })
      .select()
      .single();

    if (error) {
      return err('BUDGET_CREATE_FAILED', error.message);
    }

    return ok(data as BudgetEntry);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to create budget entry';
    return err('BUDGET_CREATE_FAILED', message);
  }
}

export async function deleteBudgetEntry(id: string): Promise<Result<{ id: string }>> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase as any).from('budget_entry').delete().eq('id', id);

    if (error) {
      return err('BUDGET_DELETE_FAILED', error.message);
    }

    return ok({ id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to delete entry';
    return err('BUDGET_DELETE_FAILED', message);
  }
}

export async function applyBudgetTemplate(
  tripId: string,
  countryCode: string
): Promise<Result<BudgetEntry[]>> {
  try {
    const supabase = await createClient();
    const template = getBudgetTemplate(countryCode);

    if (!template) {
      return err('TEMPLATE_NOT_FOUND', 'No preset budget template found for this destination');
    }

    const rows = template.entries.map((entry) => ({
      trip_id: tripId,
      category: entry.category,
      label: entry.label,
      amount: entry.amount,
      currency: 'PHP',
    }));

    const { data, error } = await (supabase as any).from('budget_entry').insert(rows).select();

    if (error) {
      return err('BUDGET_TEMPLATE_FAILED', error.message);
    }

    return ok((data as BudgetEntry[]) || []);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to apply budget template';
    return err('BUDGET_TEMPLATE_FAILED', message);
  }
}
