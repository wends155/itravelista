'use server';

import { createClient } from '@/lib/supabase/server';
import { ok, err, Result } from '@/lib/errors';
import type { Trip } from '@/types/database';
import { TripFormData, tripFormSchema } from '../types';

export async function getTrips(): Promise<Result<Trip[]>> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return ok([]); // Empty array for unauthenticated/guest
    }

    const { data, error } = await (supabase as any)
      .from('trip')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      return err('TRIP_FETCH_FAILED', error.message);
    }

    return ok((data as Trip[]) || []);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to fetch trips';
    return err('TRIP_FETCH_FAILED', message);
  }
}

export async function getTripById(id: string): Promise<Result<Trip>> {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('trip')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return err('TRIP_NOT_FOUND', 'Trip not found');
    }

    return ok(data as Trip);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to fetch trip';
    return err('TRIP_NOT_FOUND', message);
  }
}

export async function createTrip(formData: TripFormData): Promise<Result<Trip>> {
  const validation = tripFormSchema.safeParse(formData);
  if (!validation.success) {
    return err('VALIDATION_ERROR', validation.error.issues[0]?.message || 'Invalid form data');
  }

  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return err('UNAUTHORIZED', 'You must be signed in to create a trip');
    }

    const { data, error } = await (supabase as any)
      .from('trip')
      .insert({
        user_id: session.user.id,
        title: formData.title,
        destination: formData.destination,
        country_code: formData.country_code.toUpperCase(),
        start_date: formData.start_date,
        end_date: formData.end_date,
        cover_image_url: formData.cover_image_url || null,
        status: 'planning',
      })
      .select()
      .single();

    if (error) {
      return err('TRIP_CREATE_FAILED', error.message);
    }

    return ok(data as Trip);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to create trip';
    return err('TRIP_CREATE_FAILED', message);
  }
}

export async function updateTrip(id: string, formData: Partial<TripFormData>): Promise<Result<Trip>> {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('trip')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return err('TRIP_UPDATE_FAILED', error.message);
    }

    return ok(data as Trip);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to update trip';
    return err('TRIP_UPDATE_FAILED', message);
  }
}

export async function deleteTrip(id: string): Promise<Result<{ id: string }>> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase as any).from('trip').delete().eq('id', id);

    if (error) {
      return err('TRIP_DELETE_FAILED', error.message);
    }

    return ok({ id });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Failed to delete trip';
    return err('TRIP_DELETE_FAILED', message);
  }
}
