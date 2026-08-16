import Link from 'next/link';
import { Search, FileText, Wallet, Compass, ShieldCheck } from 'lucide-react';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header';
import { TravelReadinessWidget } from '@/features/dashboard/components/travel-readiness-widget';

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-3 md:max-w-2xl">
      {/* App Header */}
      <DashboardHeader />

      {/* Hero Section */}
      <section className="px-4">
        <div className="relative min-h-[140px] overflow-hidden rounded-3xl shadow-lg sm:min-h-[200px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          />
          {/* Dark Gradient Scrim Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          {/* Hero Content */}
          <div className="relative z-10 p-5 text-white">
            <h2 className="text-2xl font-bold md:text-3xl">Where do you want to go?</h2>
            <p className="mt-0.5 text-xs text-[#E0F2F1]">
              Plan. Prepare. Apply. Travel worry-free.
            </p>

            {/* Search Bar Pill Link */}
            <Link
              href="/visa"
              className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[#1A1A1A] shadow-md transition-transform hover:scale-[1.01]"
            >
              <Search className="h-4 w-4 text-[#6C757D]" />
              <span className="text-xs text-[#6C757D]">
                Search destination visa requirements (e.g. Japan)
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Travel Readiness Widget */}
      <section className="px-4">
        <TravelReadinessWidget />
      </section>

      {/* Quick Access Row */}
      <section className="px-4">
        <h3 className="text-sm font-bold text-[#1A1A1A]">Quick Access</h3>
        <div className="mt-2.5 flex gap-2.5 overflow-x-auto pb-1 text-center scrollbar-none sm:gap-3">
          <Link
            href="/visa"
            className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-2xs transition-colors hover:border hover:border-[#008080]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-[#1A1A1A] truncate w-full">Visa Assistant</span>
          </Link>

          <Link
            href="/checklist"
            className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-2xs transition-colors hover:border hover:border-[#008080]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-[#1A1A1A] truncate w-full">Checklist</span>
          </Link>

          <Link
            href="/budget"
            className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-2xs transition-colors hover:border hover:border-[#008080]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-[#1A1A1A] truncate w-full">Budget</span>
          </Link>

          <div
            className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-2xl bg-white p-3 opacity-50 cursor-not-allowed"
            aria-label="Travel Guides coming soon"
            title="Coming soon"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-gray-500 truncate w-full">Guides (Soon)</span>
          </div>
        </div>
      </section>
    </div>
  );
}

