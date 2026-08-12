import Link from 'next/link';
import { Bell, Menu, Search, FileText, Wallet, Compass, ShieldCheck } from 'lucide-react';
import { TravelReadinessWidget } from '@/features/dashboard/components/travel-readiness-widget';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* App Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-xs">
        <button className="text-[#1A1A1A] p-1" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-black tracking-tight text-[#008080]">
            ITravelista PH
          </h1>
          <p className="text-[10px] font-medium text-[#6C757D]">From Dreaming to Departing</p>
        </div>
        <button className="relative text-[#1A1A1A] p-1" aria-label="Notifications">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#D0021B]" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#008080] to-[#005B5B] p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Where do you want to go?</h2>
          <p className="mt-1 text-sm text-[#E0F2F1]">
            Plan. Prepare. Apply. Travel worry-free.
          </p>

          {/* Search bar links to Visa Assistant */}
          <Link
            href="/visa"
            className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-[#1A1A1A] shadow-md transition-transform hover:scale-[1.01]"
          >
            <Search className="h-5 w-5 text-[#6C757D]" />
            <span className="text-sm text-[#6C757D]">Search destination visa requirements (e.g. Japan)</span>
          </Link>
        </div>
      </section>

      {/* Travel Readiness Widget */}
      <section className="px-4">
        <TravelReadinessWidget />
      </section>

      {/* Quick Access Grid */}
      <section className="px-4">
        <h3 className="text-base font-semibold text-[#1A1A1A]">Quick Access</h3>
        <div className="mt-3 grid grid-cols-4 gap-3 text-center">
          <Link
            href="/visa"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-2xs hover:border hover:border-[#008080] transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-[#1A1A1A]">Visa Assistant</span>
          </Link>

          <Link
            href="/checklist"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-2xs hover:border hover:border-[#008080] transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-[#1A1A1A]">Checklist</span>
          </Link>

          <Link
            href="/budget"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-2xs hover:border hover:border-[#008080] transition-colors"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <Wallet className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-[#1A1A1A]">Budget</span>
          </Link>

          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 opacity-60">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Compass className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-gray-500">Guides (Soon)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
