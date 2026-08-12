'use client';

import Link from 'next/link';
import { useTrips } from '@/features/trips/hooks/use-trips';

export function TravelReadinessWidget() {
  const { data: trips } = useTrips();

  const activeTripsCount = (trips || []).length;

  return (
    <div className="rounded-2xl border border-[#E0E0E0] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <h3 className="text-sm font-semibold text-[#1A1A1A]">Your Travel Readiness</h3>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex flex-col items-center">
          {/* Circular gauge */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#E0F2F1] border-t-[#008080]">
            <span className="text-lg font-bold text-[#008080]">
              {activeTripsCount > 0 ? '65%' : '0%'}
            </span>
          </div>
          <span className="mt-1.5 text-[11px] font-medium text-[#6C757D]">
            {activeTripsCount > 0 ? 'On Track' : 'Start Planning!'}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="rounded-xl bg-[#F8F9FA] p-2.5">
            <span className="text-[11px] text-[#6C757D]">Active Trips</span>
            <p className="text-base font-bold text-[#1A1A1A]">{activeTripsCount} Upcoming</p>
          </div>
          <div className="rounded-xl bg-[#F8F9FA] p-2.5">
            <span className="text-[11px] text-[#6C757D]">Visa Guides</span>
            <p className="text-base font-bold text-[#1A1A1A]">10 Available</p>
          </div>
        </div>
      </div>

      <Link
        href={activeTripsCount > 0 ? '/trips' : '/trips/new'}
        className="mt-3 flex w-full items-center justify-center rounded-full bg-[#008080] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#006B6B]"
      >
        {activeTripsCount > 0 ? 'View All Trips' : 'Create First Trip'}
      </Link>
    </div>
  );
}
