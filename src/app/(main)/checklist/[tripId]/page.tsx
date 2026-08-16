'use client';

import { use, useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { useTrip } from '@/features/trips/hooks/use-trips';
import {
  useChecklist,
  useCreateChecklistItem,
  useGenerateChecklist,
} from '@/features/checklist/hooks/use-checklist';
import { ChecklistProgressBar } from '@/features/checklist/components/checklist-progress-bar';
import { ChecklistFilterTabs } from '@/features/checklist/components/checklist-filter-tabs';
import { ChecklistItemRow } from '@/features/checklist/components/checklist-item-row';
import { EmptyState } from '@/components/shared/empty-state';
import type { ChecklistFilter } from '@/features/checklist/types';
import { CheckSquare, Plus, Wand2 } from 'lucide-react';
import type { ChecklistCategory } from '@/lib/constants';

export default function TripChecklistPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = use(params);
  const { data: trip } = useTrip(tripId);
  const { data: items, isLoading } = useChecklist(tripId);
  const createMutation = useCreateChecklistItem(tripId);
  const generateMutation = useGenerateChecklist(tripId);

  const [filter, setFilter] = useState<ChecklistFilter>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ChecklistCategory>('general');
  const [showAddForm, setShowAddForm] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        <div className="h-20 w-full animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-12 w-full animate-pulse rounded-full bg-gray-200" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 w-full animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    );
  }

  const checklistItems = items || [];
  const total = checklistItems.length;
  const completed = checklistItems.filter((item) => item.status === 'completed').length;
  const todo = checklistItems.filter((item) => item.status === 'todo').length;

  const filteredItems = checklistItems.filter((item) => {
    if (filter === 'todo') return item.status === 'todo';
    if (filter === 'completed') return item.status === 'completed';
    return true;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createMutation.mutate({
      title: newTitle.trim(),
      category: newCategory,
      status: 'todo',
    });

    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title={trip?.title ? `${trip.title} Checklist` : 'Smart Checklist'}
        showBack={true}
        backHref="/checklist"
        rightAction={
          trip?.country_code ? (
            <button
              onClick={() => generateMutation.mutate(trip.country_code)}
              disabled={generateMutation.isPending}
              className="flex items-center gap-1 text-xs font-semibold text-[#008080] hover:underline"
            >
              <Wand2 className="h-4 w-4" />
              <span>Auto-Fill</span>
            </button>
          ) : null
        }
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Progress */}
        <ChecklistProgressBar completed={completed} total={total} />

        {/* Filters */}
        <ChecklistFilterTabs
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{ all: total, todo, in_progress: 0, completed }}
        />

        {/* Add item inline toggle */}
        {showAddForm ? (
          <form onSubmit={handleAddItem} className="flex flex-col gap-2 rounded-2xl bg-white p-3 border border-[#008080] shadow-sm">
            <input
              type="text"
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new task title..."
              className="w-full text-sm focus:outline-none"
            />
            <div className="flex items-center justify-between pt-2 border-t border-[#E0E0E0]">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as ChecklistCategory)}
                className="rounded-lg bg-[#F8F9FA] px-2 py-1 text-xs text-[#1A1A1A] border border-[#E0E0E0]"
              >
                <option value="general">General</option>
                <option value="documents">Documents</option>
                <option value="booking">Booking</option>
                <option value="insurance">Insurance</option>
                <option value="money">Money</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1 text-xs text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#008080] px-4 py-1 text-xs font-semibold text-white"
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#008080] bg-[#E0F2F1]/50 py-3 text-xs font-bold text-[#008080] hover:bg-[#E0F2F1]"
          >
            <Plus className="h-4 w-4" /> Add Custom Task
          </button>
        )}

        {/* Items List */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No Items"
            description="No checklist tasks match the selected filter."
          />
        ) : (
          <div className="flex flex-col gap-2.5">
            {filteredItems.map((item) => (
              <ChecklistItemRow key={item.id} item={item} tripId={tripId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
