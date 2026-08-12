'use client';

import { formatCurrency } from '@/lib/utils';
import type { CategoryBreakdown } from '../types';
import type { BudgetEntry } from '@/types/database';
import { useDeleteBudgetEntry } from '../hooks/use-budget';
import { Trash2 } from 'lucide-react';

interface BudgetLegendListProps {
  tripId: string;
  breakdown: CategoryBreakdown[];
  entries: BudgetEntry[];
}

export function BudgetLegendList({ tripId, breakdown, entries }: BudgetLegendListProps) {
  const deleteMutation = useDeleteBudgetEntry(tripId);

  return (
    <div className="flex flex-col gap-4">
      {/* Category Summaries */}
      <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 border border-[#E0E0E0] shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6C757D]">Category Breakdown</h3>
        <div className="flex flex-col gap-2.5 pt-1">
          {breakdown.map((item) => (
            <div key={item.category} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-[#1A1A1A]">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1A1A1A]">{formatCurrency(item.amount)}</span>
                <span className="w-9 text-right font-medium text-[#6C757D]">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Expense Item List */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6C757D] px-1">Expense Entries</h3>
        {entries.length === 0 ? (
          <p className="text-xs text-[#6C757D] italic px-1">No expenses added yet.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-xl border border-[#E0E0E0] bg-white p-3 shadow-2xs"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1A1A1A]">{entry.label}</span>
                <span className="text-[10px] text-[#6C757D] capitalize">{entry.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#008080]">{formatCurrency(Number(entry.amount))}</span>
                <button
                  type="button"
                  onClick={() => deleteMutation.mutate(entry.id)}
                  disabled={deleteMutation.isPending}
                  className="text-[#ADB5BD] hover:text-[#D0021B] p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
