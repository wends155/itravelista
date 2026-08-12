'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getChecklistItems,
  toggleChecklistItem,
  createChecklistItem,
  deleteChecklistItem,
  generateChecklistForTrip,
} from '../actions/checklist-actions';
import type { ChecklistItemFormData } from '../types';
import type { ChecklistItem } from '@/types/database';

export const CHECKLIST_KEYS = {
  list: (tripId: string) => ['checklist', tripId] as const,
};

export function useChecklist(tripId: string) {
  return useQuery({
    queryKey: CHECKLIST_KEYS.list(tripId),
    queryFn: async () => {
      const res = await getChecklistItems(tripId);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    enabled: !!tripId,
  });
}

export function useToggleChecklistItem(tripId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await toggleChecklistItem(id, status);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: CHECKLIST_KEYS.list(tripId) });
      const previous = queryClient.getQueryData<ChecklistItem[]>(CHECKLIST_KEYS.list(tripId));

      if (previous) {
        const next = previous.map((item) =>
          item.id === id ? { ...item, status: status === 'completed' ? 'todo' : 'completed' } : item
        );
        queryClient.setQueryData(CHECKLIST_KEYS.list(tripId), next);
      }

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CHECKLIST_KEYS.list(tripId), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CHECKLIST_KEYS.list(tripId) });
    },
  });
}

export function useCreateChecklistItem(tripId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChecklistItemFormData) => {
      const res = await createChecklistItem(tripId, data);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHECKLIST_KEYS.list(tripId) });
    },
  });
}

export function useDeleteChecklistItem(tripId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteChecklistItem(id);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHECKLIST_KEYS.list(tripId) });
    },
  });
}

export function useGenerateChecklist(tripId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (countryCode: string) => {
      const res = await generateChecklistForTrip(tripId, countryCode);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHECKLIST_KEYS.list(tripId) });
    },
  });
}
