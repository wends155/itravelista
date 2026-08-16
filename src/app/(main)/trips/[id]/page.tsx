'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageHeader } from '@/components/shared/page-header';
import { useTrip } from '@/features/trips/hooks/use-trips';
import { formatDate, daysUntil, getTripStatus } from '@/lib/utils';
import { CheckSquare, Wallet, ShieldCheck, Calendar, MapPin, Clock } from 'lucide-react';

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: trip, isLoading, isError } = useTrip(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="h-48 w-full animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-red-500">Trip not found</p>
        <Link href="/trips" className="mt-2 inline-block text-xs font-semibold text-[#008080]">
          Back to My Trips
        </Link>
      </div>
    );
  }

  const daysLeft = daysUntil(trip.start_date);
  const status = getTripStatus(trip.start_date, trip.end_date);

  return (
    <div className="flex flex-col">
      <PageHeader title={trip.title} showBack={true} backHref="/trips" />

      {/* Hero Banner */}
      <div className="relative h-52 w-full bg-slate-800">
        <Image
          src={
            trip.cover_image_url ||
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
          }
          alt={trip.destination}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#008080] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
              {status}
            </span>
            {daysLeft > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-xs text-white">
                <Clock className="h-3.5 w-3.5" /> {daysLeft} days to go
              </span>
            )}
          </div>
          <h1 className="mt-1 text-2xl font-black">{trip.destination}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/90">
            <Calendar className="h-3.5 w-3.5 text-[#E0F2F1]" />
            {formatDate(trip.start_date, 'MMM d, yyyy')} - {formatDate(trip.end_date, 'MMM d, yyyy')}
          </p>
        </div>
      </div>

      {/* Quick Feature Navigation Grid */}
      <div className="p-4">
        <h2 className="text-sm font-semibold text-[#1A1A1A]">Trip Planning Tools</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <Link
            href={`/checklist/${trip.id}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#E0E0E0] bg-white p-4 text-center shadow-xs transition-transform hover:scale-105"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <CheckSquare className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-[#1A1A1A]">Checklist</span>
          </Link>

          <Link
            href={`/budget/${trip.id}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#E0E0E0] bg-white p-4 text-center shadow-xs transition-transform hover:scale-105"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-[#1A1A1A]">Budget</span>
          </Link>

          <Link
            href={`/visa/${trip.country_code}`}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#E0E0E0] bg-white p-4 text-center shadow-xs transition-transform hover:scale-105"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-[#1A1A1A]">Visa Help</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
