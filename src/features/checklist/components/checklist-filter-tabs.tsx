'use client';

import type { ChecklistFilter } from '../types';

interface ChecklistFilterTabsProps {
  currentFilter: ChecklistFilter;
  onFilterChange: (filter: ChecklistFilter) => void;
  counts: { all: number; todo: number; in_progress: number; completed: number };
}

export function ChecklistFilterTabs({
  currentFilter,
  onFilterChange,
  counts,
}: ChecklistFilterTabsProps) {
  const tabs: { key: ChecklistFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'todo', label: 'To Do', count: counts.todo },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onFilterChange(tab.key)}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            currentFilter === tab.key
              ? 'bg-[#008080] text-white shadow-xs'
              : 'bg-[#F8F9FA] text-[#6C757D] border border-[#E0E0E0] hover:bg-gray-100'
          }`}
        >
          <span>{tab.label}</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
              currentFilter === tab.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-[#1A1A1A]'
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
