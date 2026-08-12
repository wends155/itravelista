'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VISA_COUNTRIES } from '../data/countries';
import { Search, ChevronRight, ShieldCheck } from 'lucide-react';
import { VISA_TYPES } from '@/lib/constants';

export function VisaCountrySelector() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredCountries = VISA_COUNTRIES.filter(
    (c) =>
      c.country_name.toLowerCase().includes(search.toLowerCase()) ||
      c.country_code.toLowerCase().includes(search.toLowerCase())
  );

  const getVisaBadge = (type: string) => {
    switch (type) {
      case 'visa_free':
        return <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-[#008080]">Visa-Free</span>;
      case 'e_visa':
        return <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-[#4A90E2]">eVisa</span>;
      case 'visa_on_arrival':
        return <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-[#F5A623]">Visa on Arrival</span>;
      default:
        return <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-[#7B61FF]">Embassy Visa</span>;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-[#6C757D]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search country (e.g. Japan, Korea)"
          className="w-full rounded-2xl border border-[#E0E0E0] bg-white py-3 pl-10 pr-4 text-sm shadow-xs focus:border-[#008080] focus:outline-none"
        />
      </div>

      {/* Country List */}
      <div className="flex flex-col gap-2.5">
        {filteredCountries.map((country) => (
          <button
            key={country.country_code}
            onClick={() => router.push(`/visa/${country.country_code}`)}
            className="flex items-center justify-between rounded-2xl border border-[#E0E0E0] bg-white p-4 shadow-2xs transition-all hover:border-[#008080] hover:shadow-xs text-left"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2F1] text-[#008080] font-black">
                {country.country_code}
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A]">{country.country_name}</h4>
                <div className="mt-0.5">{getVisaBadge(country.visa_type)}</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#6C757D]" />
          </button>
        ))}
      </div>
    </div>
  );
}
