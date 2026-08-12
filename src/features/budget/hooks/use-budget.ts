'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getBudgetEntries,
  createBudgetEntry,
  deleteBudgetEntry,
  applyBudgetTemplate,
} from '../actions/budget-actions';
import type { BudgetEntryFormData } from '../types';

export const BUDGET_KEYS = {
  list: (tripId: string) => ['budget', tripId] as const,
};

export function useBudget(tripId: string) {
  return useQuery({
    queryKey: BUDGET_KEYS.list(tripId),
    queryFn: async () => {
      const res = await getBudgetEntries(tripId);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    enabled: !!tripId,
  });
}

export function useCreateBudgetEntry(tripId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BudgetEntryFormData) => {
      const res = await createBudgetEntry(tripId, data);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.list(tripId) });
    },
  });
}

export function useDeleteBudgetEntry(tripId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteBudgetEntry(id);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.list(tripId) });
    },
  });
}

export function useApplyBudgetTemplate(tripId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (countryCode: string) => {
      const res = await applyBudgetTemplate(tripId, countryCode);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.list(tripId) });
    },
  });
}
