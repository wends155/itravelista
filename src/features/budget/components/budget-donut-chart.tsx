'use client';

import { formatCurrency } from '@/lib/utils';
import type { CategoryBreakdown } from '../types';

interface BudgetDonutChartProps {
  total: number;
  breakdown: CategoryBreakdown[];
}

export function BudgetDonutChart({ total, breakdown }: BudgetDonutChartProps) {
  const size = 160;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E0F2F1"
          strokeWidth={strokeWidth}
        />

        {/* Donut Segments */}
        {total > 0 &&
          breakdown.map((item) => {
            if (item.percentage === 0) return null;
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += item.percentage;

            return (
              <circle
                key={item.category}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-medium text-[#6C757D]">Total Budget</span>
        <span className="text-sm font-black text-[#1A1A1A]">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
