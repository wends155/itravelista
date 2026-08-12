'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateTrip } from '../hooks/use-trips';
import type { TripFormData } from '../types';
import { MapPin, Calendar, Image as ImageIcon } from 'lucide-react';

const POPULAR_DESTINATIONS = [
  { name: 'Japan', code: 'JP' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'United States', code: 'US' },
];

export function TripForm() {
  const router = useRouter();
  const createTripMutation = useCreateTrip();

  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [countryCode, setCountryCode] = useState('JP');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDestinationSelect = (name: string, code: string) => {
    setDestination(name);
    setCountryCode(code);
    if (!title) {
      setTitle(`${name} Trip`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title || !destination || !startDate || !endDate) {
      setErrorMsg('Please fill in all required fields');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setErrorMsg('End date must be after start date');
      return;
    }

    const payload: TripFormData = {
      title,
      destination,
      country_code: countryCode,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      await createTripMutation.mutateAsync(payload);
      router.push('/trips');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create trip';
      setErrorMsg(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-md border border-[#E0E0E0]">
      {errorMsg && (
        <div className="rounded-xl bg-red-50 p-3 text-xs text-[#D0021B] border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* Quick Select Popular Country */}
      <div>
        <label className="text-xs font-semibold text-[#1A1A1A]">Popular Destinations</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {POPULAR_DESTINATIONS.map((dest) => (
            <button
              key={dest.code}
              type="button"
              onClick={() => handleDestinationSelect(dest.name, dest.code)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                countryCode === dest.code && destination === dest.name
                  ? 'bg-[#008080] text-white'
                  : 'bg-[#F8F9FA] text-[#1A1A1A] border border-[#E0E0E0] hover:bg-gray-100'
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trip Title */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#1A1A1A]">Trip Title</label>
        <div className="relative flex items-center">
          <ImageIcon className="absolute left-3 h-4 w-4 text-[#6C757D]" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Cherry Blossom Tokyo Trip"
            className="w-full rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] py-2.5 pl-10 pr-3 text-sm focus:border-[#008080] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Destination Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#1A1A1A]">Destination</label>
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 h-4 w-4 text-[#6C757D]" />
          <input
            type="text"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Tokyo, Osaka, Kyoto"
            className="w-full rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] py-2.5 pl-10 pr-3 text-sm focus:border-[#008080] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Start & End Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#1A1A1A]">Start Date</label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 h-4 w-4 text-[#6C757D]" />
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] py-2.5 pl-10 pr-3 text-xs focus:border-[#008080] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#1A1A1A]">End Date</label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3 h-4 w-4 text-[#6C757D]" />
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] py-2.5 pl-10 pr-3 text-xs focus:border-[#008080] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={createTripMutation.isPending}
        className="mt-2 w-full rounded-full bg-[#008080] py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#006B6B] disabled:opacity-50"
      >
        {createTripMutation.isPending ? 'Saving Trip...' : 'Create Trip'}
      </button>
    </form>
  );
}
