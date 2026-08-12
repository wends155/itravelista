'use server';

import { createClient } from '@/lib/supabase/server';
import { ok, err, Result } from '@/lib/errors';
import type { ChecklistItem } from '@/types/database';
import { ChecklistItemFormData, checklistItemFormSchema } from '../types';
import { getChecklistItemsForDestination } from '../templates/checklist-templates';

export async function getChecklistItems(tripId: string): Promise<Result<ChecklistItem[]>> {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('checklist_item')
      .select('*')
      .eq('trip_id', tripId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      return err('CHECKLIST_FETCH_FAILED', error.message);
    }

    return ok((data as ChecklistItem[]) || []);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to fetch checklist';
    return err('CHECKLIST_FETCH_FAILED', message);
  }
}

export async function toggleChecklistItem(id: string, currentStatus: string): Promise<Result<ChecklistItem>> {
  const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';

  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('checklist_item')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return err('CHECKLIST_UPDATE_FAILED', error.message);
    }

    return ok(data as ChecklistItem);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to update checklist item';
    return err('CHECKLIST_UPDATE_FAILED', message);
  }
}

export async function createChecklistItem(
  tripId: string,
  formData: ChecklistItemFormData
): Promise<Result<ChecklistItem>> {
  const validation = checklistItemFormSchema.safeParse(formData);
  if (!validation.success) {
    return err('VALIDATION_ERROR', validation.error.issues[0]?.message || 'Invalid form data');
  }

  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('checklist_item')
      .insert({
        trip_id: tripId,
        title: formData.title,
        description: formData.description || null,
        category: formData.category,
        status: formData.status,
        is_auto_generated: false,
      })
      .select()
      .single();

    if (error) {
      return err('CHECKLIST_CREATE_FAILED', error.message);
    }

    return ok(data as ChecklistItem);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to create checklist item';
    return err('CHECKLIST_CREATE_FAILED', message);
  }
}

export async function deleteChecklistItem(id: string): Promise<Result<{ id: string }>> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase as any).from('checklist_item').delete().eq('id', id);

    if (error) {
      return err('CHECKLIST_DELETE_FAILED', error.message);
    }

    return ok({ id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to delete item';
    return err('CHECKLIST_DELETE_FAILED', message);
  }
}

export async function generateChecklistForTrip(
  tripId: string,
  countryCode: string
): Promise<Result<ChecklistItem[]>> {
  try {
    const supabase = await createClient();
    const templateItems = getChecklistItemsForDestination(countryCode);

    const rows = templateItems.map((item, index) => ({
      trip_id: tripId,
      title: item.title,
      description: item.description || null,
      category: item.category,
      status: 'todo',
      sort_order: index,
      is_auto_generated: true,
    }));

    const { data, error } = await (supabase as any).from('checklist_item').insert(rows).select();

    if (error) {
      return err('CHECKLIST_GENERATE_FAILED', error.message);
    }

    return ok((data as ChecklistItem[]) || []);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to auto-generate checklist';
    return err('CHECKLIST_GENERATE_FAILED', message);
  }
}
