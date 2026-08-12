import Link from 'next/link';
import { Search, FileText, Wallet, Compass, ShieldCheck } from 'lucide-react';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header';
import { TravelReadinessWidget } from '@/features/dashboard/components/travel-readiness-widget';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* App Header */}
      <DashboardHeader />

      {/* Hero Section */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#008080] to-[#005B5B] p-5 text-white shadow-lg">
          <h2 className="text-xl font-bold">Where do you want to go?</h2>
          <p className="mt-0.5 text-xs text-[#E0F2F1]">
            Plan. Prepare. Apply. Travel worry-free.
          </p>

          {/* Search bar links to Visa Assistant */}
          <Link
            href="/visa"
            className="mt-3 flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5 text-[#1A1A1A] shadow-md transition-transform hover:scale-[1.01]"
          >
            <Search className="h-4 w-4 text-[#6C757D]" />
            <span className="text-xs text-[#6C757D]">Search destination visa requirements (e.g. Japan)</span>
          </Link>
        </div>
      </section>

      {/* Travel Readiness Widget */}
      <section className="px-4">
        <TravelReadinessWidget />
      </section>

      {/* Quick Access Grid */}
      <section className="px-4">
        <h3 className="text-sm font-semibold text-[#1A1A1A]">Quick Access</h3>
        <div className="mt-2 grid grid-cols-4 gap-2.5 text-center">
          <Link
            href="/visa"
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 shadow-2xs hover:border hover:border-[#008080] transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-medium text-[#1A1A1A]">Visa Assistant</span>
          </Link>

          <Link
            href="/checklist"
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 shadow-2xs hover:border hover:border-[#008080] transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-medium text-[#1A1A1A]">Checklist</span>
          </Link>

          <Link
            href="/budget"
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 shadow-2xs hover:border hover:border-[#008080] transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-medium text-[#1A1A1A]">Budget</span>
          </Link>

          <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 opacity-60">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-medium text-gray-500">Guides (Soon)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
