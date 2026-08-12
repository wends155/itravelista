'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BudgetSelectorPage() {
  const router = useRouter();
  const { data: trips, isLoading } = useTrips();

  useEffect(() => {
    if (trips && trips.length === 1 && trips[0]?.id) {
      router.replace(`/budget/${trips[0].id}`);
    }
  }, [trips, router]);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (!trips || trips.length === 0) {
    return (
      <div className="flex flex-col">
        <PageHeader title="Budget Planner" />
        <div className="p-4">
          <EmptyState
            icon={Wallet}
            title="No Active Trip"
            description="Create a trip first to start planning your PHP budget breakdown."
            action={
              <Link
                href="/trips/new"
                className="inline-flex items-center justify-center rounded-full bg-[#008080] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#006B6B]"
              >
                Create Trip
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-24">
      <PageHeader title="Select a Trip Budget" />
      <div className="flex flex-col gap-3 p-4">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/budget/${trip.id}`}
            className="flex items-center justify-between rounded-2xl border border-[#E0E0E0] bg-white p-4 shadow-xs hover:border-[#008080]"
          >
            <div>
              <h3 className="font-bold text-[#1A1A1A]">{trip.title}</h3>
              <p className="text-xs text-[#6C757D]">{trip.destination}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-[#008080]" />
          </Link>
        ))}
      </div>
    </div>
  );
}
