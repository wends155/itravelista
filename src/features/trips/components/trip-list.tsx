'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTrips } from '../hooks/use-trips';
import { TripCard } from './trip-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Plus, MapPin } from 'lucide-react';
import { getTripStatus } from '@/lib/utils';
import type { TripFilter } from '../types';

export function TripList() {
  const { data: trips, isLoading, isError } = useTrips();
  const [filter, setFilter] = useState<TripFilter>('upcoming');

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 py-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-44 w-full animate-pulse rounded-2xl bg-gray-200" />
        ))}
      </div>
    );
  }

  const filteredTrips = (trips || []).filter((trip) => {
    const status = getTripStatus(trip.start_date, trip.end_date);
    if (filter === 'upcoming') return status === 'upcoming' || status === 'planning' || status === 'in_progress';
    if (filter === 'past') return status === 'completed';
    return true;
  });

  return (
    <div className="flex flex-col gap-5 px-4 py-4 pb-24">
      {/* Tabs Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 rounded-full bg-[#E0E0E0] p-1">
          <button
            onClick={() => setFilter('upcoming')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === 'upcoming' ? 'bg-[#008080] text-white shadow-xs' : 'text-[#6C757D]'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === 'past' ? 'bg-[#008080] text-white shadow-xs' : 'text-[#6C757D]'
            }`}
          >
            Past Trips
          </button>
        </div>

        <Link
          href="/trips/new"
          className="flex items-center gap-1 text-xs font-semibold text-[#008080] hover:underline"
        >
          <Plus className="h-4 w-4" /> Add Trip
        </Link>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title={filter === 'upcoming' ? 'No Upcoming Trips' : 'No Past Trips'}
          description={
            filter === 'upcoming'
              ? "You don't have any trips planned yet. Start dreaming your next getaway!"
              : "You haven't completed any trips yet."
          }
          action={
            <Link
              href="/trips/new"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008080] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#006B6B]"
            >
              <Plus className="h-4 w-4" /> Plan a New Trip
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <Link
        href="/trips/new"
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-[#008080] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
      >
        <Plus className="h-5 w-5" />
        <span>Add Trip</span>
      </Link>
    </div>
  );
}
