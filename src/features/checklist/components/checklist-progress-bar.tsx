'use client';

import { percentage } from '@/lib/utils';

interface ChecklistProgressBarProps {
  completed: number;
  total: number;
}

export function ChecklistProgressBar({ completed, total }: ChecklistProgressBarProps) {
  const pct = percentage(completed, total);

  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 border border-[#E0E0E0] shadow-xs">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-[#1A1A1A]">Checklist Readiness</span>
        <span className="font-bold text-[#008080]">
          {completed} / {total} Completed ({pct}%)
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E0F2F1]">
        <div
          className="h-full bg-[#008080] transition-all duration-300 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
