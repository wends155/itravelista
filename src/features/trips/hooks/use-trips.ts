'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTrips, getTripById, createTrip, updateTrip, deleteTrip } from '../actions/trip-actions';
import type { TripFormData } from '../types';
import type { Trip } from '@/types/database';

export const TRIP_KEYS = {
  all: ['trips'] as const,
  detail: (id: string) => ['trips', id] as const,
};

export function useTrips() {
  return useQuery({
    queryKey: TRIP_KEYS.all,
    queryFn: async () => {
      const res = await getTrips();
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
  });
}

export function useTrip(id: string) {
  return useQuery({
    queryKey: TRIP_KEYS.detail(id),
    queryFn: async () => {
      const res = await getTripById(id);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TripFormData) => {
      const res = await createTrip(data);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
    },
  });
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TripFormData> }) => {
      const res = await updateTrip(id, data);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: (updatedTrip: Trip) => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.detail(updatedTrip.id) });
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteTrip(id);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
    },
  });
}
