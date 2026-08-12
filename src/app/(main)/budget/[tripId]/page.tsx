'use client';

import { use } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { useTrip } from '@/features/trips/hooks/use-trips';
import { useBudget } from '@/features/budget/hooks/use-budget';
import { BudgetDonutChart } from '@/features/budget/components/budget-donut-chart';
import { BudgetLegendList } from '@/features/budget/components/budget-legend-list';
import { BudgetEntryForm } from '@/features/budget/components/budget-entry-form';
import { BudgetTemplateModal } from '@/features/budget/components/budget-template-modal';
import { BUDGET_CATEGORIES, BudgetCategory } from '@/lib/constants';
import type { CategoryBreakdown } from '@/features/budget/types';
import { percentage } from '@/lib/utils';

export default function TripBudgetPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = use(params);
  const { data: trip } = useTrip(tripId);
  const { data: entries, isLoading } = useBudget(tripId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="h-44 w-full animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  const budgetEntries = entries || [];
  const total = budgetEntries.reduce((sum, item) => sum + Number(item.amount), 0);

  // Group by category for donut chart and legend
  const breakdown: CategoryBreakdown[] = BUDGET_CATEGORIES.map((cat) => {
    const catAmount = budgetEntries
      .filter((item) => item.category === cat.value)
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return {
      category: cat.value as BudgetCategory,
      label: cat.label,
      amount: catAmount,
      percentage: percentage(catAmount, total),
      color: cat.color,
    };
  });

  return (
    <div className="flex flex-col pb-24">
      <PageHeader
        title={trip?.title ? `${trip.title} Budget` : 'Budget Planner'}
        showBack={true}
      />

      <div className="flex flex-col gap-5 p-4">
        {/* Donut Chart Visualization */}
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-6 border border-[#E0E0E0] shadow-sm">
          <BudgetDonutChart total={total} breakdown={breakdown} />
        </div>

        {/* Preset Template Prompt if Budget is empty */}
        {budgetEntries.length === 0 && trip?.country_code && (
          <BudgetTemplateModal tripId={tripId} countryCode={trip.country_code} />
        )}

        {/* Add Entry Form */}
        <BudgetEntryForm tripId={tripId} />

        {/* Breakdown & Legend */}
        <BudgetLegendList tripId={tripId} breakdown={breakdown} entries={budgetEntries} />
      </div>
    </div>
  );
}
