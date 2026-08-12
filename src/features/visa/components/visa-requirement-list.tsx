'use client';

import { useState } from 'react';
import type { VisaRequirementDetail } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface VisaRequirementListProps {
  requirements: VisaRequirementDetail[];
}

export function VisaRequirementList({ requirements }: VisaRequirementListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="flex flex-col gap-2.5">
      {requirements.map((req, idx) => {
        const isChecked = !!checkedItems[req.item];

        return (
          <div
            key={idx}
            onClick={() => toggleCheck(req.item)}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
              isChecked
                ? 'border-emerald-300 bg-emerald-50/40'
                : 'border-[#E0E0E0] bg-white hover:border-[#008080]'
            }`}
          >
            <div className="mt-0.5 shrink-0 text-[#008080]">
              {isChecked ? (
                <CheckCircle2 className="h-5 w-5 fill-[#008080] text-white" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-bold ${
                    isChecked ? 'line-through text-gray-500' : 'text-[#1A1A1A]'
                  }`}
                >
                  {req.item}
                </span>
                {req.required ? (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-[#D0021B]">
                    Required
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    Optional
                  </span>
                )}
              </div>
              {req.description && (
                <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">{req.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
