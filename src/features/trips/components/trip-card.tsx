'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Trip } from '@/types/database';
import { formatDate, daysUntil, getTripStatus } from '@/lib/utils';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const daysLeft = daysUntil(trip.start_date);
  const status = getTripStatus(trip.start_date, trip.end_date);

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">Completed</span>;
      case 'in_progress':
        return <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-[#008080]">Happening Now</span>;
      case 'upcoming':
        return <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-[#4A90E2]">Upcoming</span>;
      default:
        return <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-[#F5A623]">Planning</span>;
    }
  };

  // Fallback preset images based on country code
  const getCoverImage = () => {
    if (trip.cover_image_url) return trip.cover_image_url;
    const code = trip.country_code.toLowerCase();
    return `https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80`; // Default travel landscape
  };

  return (
    <Link href={`/trips/${trip.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 group-hover:-translate-y-1">
        {/* Cover Image Container */}
        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
          <Image
            src={getCoverImage()}
            alt={trip.destination}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Top Status & Countdown */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            {getStatusBadge()}
            {daysLeft > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <Clock className="h-3.5 w-3.5" />
                <span>{daysLeft} days left</span>
              </div>
            )}
          </div>

          {/* Bottom Title & Dates */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-md">{trip.title}</h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-white/90">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#E0F2F1]" />
                {trip.destination}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#E0F2F1]" />
                {formatDate(trip.start_date, 'MMM d')} - {formatDate(trip.end_date, 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
