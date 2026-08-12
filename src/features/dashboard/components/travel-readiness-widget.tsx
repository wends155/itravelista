'use client';

import Link from 'next/link';
import { useTrips } from '@/features/trips/hooks/use-trips';
import { percentage } from '@/lib/utils';

export function TravelReadinessWidget() {
  const { data: trips } = useTrips();

  const activeTripsCount = (trips || []).length;

  return (
    <div className="rounded-2xl border border-[#E0E0E0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <h3 className="text-base font-semibold text-[#1A1A1A]">Your Travel Readiness</h3>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-col items-center">
          {/* Circular gauge */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#E0F2F1] border-t-[#008080]">
            <span className="text-xl font-bold text-[#008080]">
              {activeTripsCount > 0 ? '65%' : '0%'}
            </span>
          </div>
          <span className="mt-2 text-xs font-medium text-[#6C757D]">
            {activeTripsCount > 0 ? 'On Track' : 'Start Planning!'}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="rounded-xl bg-[#F8F9FA] p-3">
            <span className="text-xs text-[#6C757D]">Active Trips</span>
            <p className="text-lg font-bold text-[#1A1A1A]">{activeTripsCount} Upcoming</p>
          </div>
          <div className="rounded-xl bg-[#F8F9FA] p-3">
            <span className="text-xs text-[#6C757D]">Visa Guides</span>
            <p className="text-lg font-bold text-[#1A1A1A]">10 Available</p>
          </div>
        </div>
      </div>

      <Link
        href={activeTripsCount > 0 ? '/trips' : '/trips/new'}
        className="mt-4 flex w-full items-center justify-center rounded-full bg-[#008080] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006B6B]"
      >
        {activeTripsCount > 0 ? 'View All Trips' : 'Create First Trip'}
      </Link>
    </div>
  );
}
