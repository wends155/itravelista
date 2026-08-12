'use client';

import type { ChecklistItem } from '@/types/database';
import { useToggleChecklistItem, useDeleteChecklistItem } from '../hooks/use-checklist';
import { Check, Trash2, FileText, CreditCard, Shield, Banknote, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItemRowProps {
  item: ChecklistItem;
  tripId: string;
}

export function ChecklistItemRow({ item, tripId }: ChecklistItemRowProps) {
  const toggleMutation = useToggleChecklistItem(tripId);
  const deleteMutation = useDeleteChecklistItem(tripId);

  const isCompleted = item.status === 'completed';

  const getCategoryIcon = () => {
    switch (item.category) {
      case 'documents':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'booking':
        return <CreditCard className="h-4 w-4 text-teal-600" />;
      case 'insurance':
        return <Shield className="h-4 w-4 text-purple-600" />;
      case 'money':
        return <Banknote className="h-4 w-4 text-[#F5A623]" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between gap-3 rounded-xl border border-[#E0E0E0] bg-white p-3.5 shadow-2xs transition-colors hover:border-[#008080]',
        isCompleted && 'bg-emerald-50/40 border-emerald-200'
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Checkbox Button */}
        <button
          type="button"
          onClick={() => toggleMutation.mutate({ id: item.id, status: item.status })}
          disabled={toggleMutation.isPending}
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all',
            isCompleted
              ? 'border-[#008080] bg-[#008080] text-white'
              : 'border-[#ADB5BD] bg-white hover:border-[#008080]'
          )}
        >
          {isCompleted && <Check className="h-4 w-4 stroke-[3px]" />}
        </button>

        {/* Category Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F8F9FA]">
          {getCategoryIcon()}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <span
            className={cn(
              'text-sm font-semibold text-[#1A1A1A] truncate',
              isCompleted && 'line-through text-[#6C757D]'
            )}
          >
            {item.title}
          </span>
          {item.description && (
            <p className="text-xs text-[#6C757D] truncate mt-0.5">{item.description}</p>
          )}
        </div>
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={() => deleteMutation.mutate(item.id)}
        disabled={deleteMutation.isPending}
        className="text-[#ADB5BD] opacity-0 transition-opacity hover:text-[#D0021B] group-hover:opacity-100 p-1"
        aria-label="Delete item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
