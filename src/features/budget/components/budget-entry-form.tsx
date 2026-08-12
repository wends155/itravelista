'use client';

import { useState } from 'react';
import { useCreateBudgetEntry } from '../hooks/use-budget';
import { BUDGET_CATEGORIES, BudgetCategory } from '@/lib/constants';
import { Plus } from 'lucide-react';

interface BudgetEntryFormProps {
  tripId: string;
}

export function BudgetEntryForm({ tripId }: BudgetEntryFormProps) {
  const createMutation = useCreateBudgetEntry(tripId);

  const [category, setCategory] = useState<BudgetCategory>('flights');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !amount || Number(amount) <= 0) return;

    createMutation.mutate({
      category,
      label: label.trim(),
      amount: Number(amount),
      currency: 'PHP',
    });

    setLabel('');
    setAmount('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#008080] bg-[#E0F2F1]/50 py-3 text-xs font-bold text-[#008080] hover:bg-[#E0F2F1]"
      >
        <Plus className="h-4 w-4" /> Add Custom Expense
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl bg-white p-4 border border-[#008080] shadow-md">
      <h4 className="text-xs font-bold text-[#1A1A1A]">Add Expense Entry</h4>

      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-semibold text-[#6C757D]">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as BudgetCategory)}
          className="rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-2 text-xs font-medium text-[#1A1A1A]"
        >
          {BUDGET_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-semibold text-[#6C757D]">Description</label>
        <input
          type="text"
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Flight ticket Manila - Tokyo"
          className="rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-2 text-xs focus:border-[#008080] focus:bg-white focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-semibold text-[#6C757D]">Amount (₱ PHP)</label>
        <input
          type="number"
          required
          min="1"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 25000"
          className="rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] px-3 py-2 text-xs focus:border-[#008080] focus:bg-white focus:outline-none"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-[#E0E0E0]">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-3 py-1.5 text-xs text-gray-500 hover:underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="rounded-full bg-[#008080] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#006B6B]"
        >
          {createMutation.isPending ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
    </form>
  );
}
