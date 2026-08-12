'use client';

import { useApplyBudgetTemplate } from '../hooks/use-budget';
import { getBudgetTemplate } from '../templates/budget-templates';
import { formatCurrency } from '@/lib/utils';
import { Sparkles, Check } from 'lucide-react';

interface BudgetTemplateModalProps {
  tripId: string;
  countryCode: string;
  onApplied?: () => void;
}

export function BudgetTemplateModal({ tripId, countryCode, onApplied }: BudgetTemplateModalProps) {
  const applyTemplateMutation = useApplyBudgetTemplate(tripId);
  const template = getBudgetTemplate(countryCode);

  if (!template) return null;

  const handleApply = async () => {
    try {
      await applyTemplateMutation.mutateAsync(countryCode);
      if (onApplied) onApplied();
    } catch (e) {
      console.error('Failed to apply template:', e);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#008080] bg-[#E0F2F1]/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#008080]" />
          <h4 className="text-sm font-bold text-[#1A1A1A]">
            Preset Budget: {template.destination} ({template.durationDays} Days)
          </h4>
        </div>
        <span className="text-xs font-black text-[#008080]">{formatCurrency(template.totalPHP)}</span>
      </div>

      <p className="text-xs text-[#6C757D]">
        Apply estimated budget breakdown for {template.destination} travelers in PHP. You can modify any amount later.
      </p>

      <button
        type="button"
        onClick={handleApply}
        disabled={applyTemplateMutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008080] py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#006B6B] disabled:opacity-50"
      >
        <Check className="h-4 w-4" />
        {applyTemplateMutation.isPending ? 'Applying Preset...' : 'Apply Preset Budget'}
      </button>
    </div>
  );
}
