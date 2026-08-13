'use client';

import Link from 'next/link';
import { useTrips } from '@/features/trips/hooks/use-trips';

export function TravelReadinessWidget() {
  const { data: trips } = useTrips();

  const activeTripsCount = (trips || []).length;
  const percentage = activeTripsCount > 0 ? 82 : 0;

  // SVG Donut Calculations
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  // Conditional CTA & Status
  const ctaText = activeTripsCount > 0 ? 'View Checklist' : 'Create Your First Trip';
  const ctaHref = activeTripsCount > 0 ? '/checklist' : '/trips/new';
  const readinessStatus = activeTripsCount > 0 ? "You're Almost Ready!" : 'Start Planning!';

  return (
    <div className="relative z-10 -mt-10 rounded-2xl border border-[#E0E0E0] bg-white p-4 shadow-xl">
      <h3 className="text-sm font-bold text-[#1A1A1A]">Your Travel Readiness</h3>
      <div className="mt-3 flex items-center justify-between gap-3">
        {/* Left Gauge: SVG Donut Chart */}
        <div className="flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="-rotate-90"
            >
              {/* Track Background */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#E0F2F1"
                strokeWidth={strokeWidth}
              />
              {/* Progress Segment */}
              {percentage > 0 && (
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="#008080"
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              )}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-black text-[#008080]">{percentage}%</span>
            </div>
          </div>
          <span className="mt-1.5 text-xs font-semibold text-[#6C757D]">
            {readinessStatus}
          </span>
        </div>

        {/* Right Stats */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="rounded-xl bg-[#F8F9FA] p-2.5">
            <span className="text-xs text-[#6C757D]">Active Trips</span>
            <p className="text-base font-bold text-[#1A1A1A]">{activeTripsCount} Upcoming</p>
          </div>
          <div className="rounded-xl bg-[#F8F9FA] p-2.5">
            <span className="text-xs text-[#6C757D]">Documents</span>
            <p className="text-base font-bold text-[#1A1A1A]">8 Saved</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className="mt-3 flex w-full items-center justify-center rounded-full bg-[#008080] py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#006B6B]"
      >
        {ctaText}
      </Link>
    </div>
  );
}

