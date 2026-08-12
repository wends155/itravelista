import Link from 'next/link';
import { Bell, Menu, Search, FileText, Wallet, Compass, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-xs">
        <button className="text-[#1A1A1A] p-1" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-extrabold tracking-tight text-[#008080]">
            ITravelista PH
          </h1>
          <p className="text-[10px] font-medium text-[#6C757D]">From Dreaming to Departing</p>
        </div>
        <button className="relative text-[#1A1A1A] p-1" aria-label="Notifications">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#D0021B]" />
        </button>
      </header>

      {/* Hero Container */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#008080] to-[#005B5B] p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Where do you want to go?</h2>
          <p className="mt-1 text-sm text-[#E0F2F1]">
            Plan. Prepare. Apply. Travel worry-free.
          </p>

          {/* Search bar */}
          <div className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-[#1A1A1A] shadow-md">
            <Search className="h-5 w-5 text-[#6C757D]" />
            <input
              type="text"
              placeholder="Search destination or country (e.g. Japan)"
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[#6C757D]"
            />
          </div>
        </div>
      </section>

      {/* Travel Readiness Widget Placeholder */}
      <section className="px-4">
        <div className="rounded-2xl border border-[#E0E0E0] bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h3 className="text-base font-semibold text-[#1A1A1A]">Your Travel Readiness</h3>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex flex-col items-center">
              {/* Circular gauge placeholder */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#E0F2F1] border-t-[#008080]">
                <span className="text-xl font-bold text-[#008080]">0%</span>
              </div>
              <span className="mt-2 text-xs font-medium text-[#6C757D]">Start Planning!</span>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              <div className="rounded-xl bg-[#F8F9FA] p-3">
                <span className="text-xs text-[#6C757D]">Trips</span>
                <p className="text-lg font-bold text-[#1A1A1A]">0 Upcoming</p>
              </div>
              <div className="rounded-xl bg-[#F8F9FA] p-3">
                <span className="text-xs text-[#6C757D]">Documents</span>
                <p className="text-lg font-bold text-[#1A1A1A]">0 Saved</p>
              </div>
            </div>
          </div>

          <Link
            href="/trips"
            className="mt-4 flex w-full items-center justify-center rounded-full bg-[#008080] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006B6B]"
          >
            Create First Trip
          </Link>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="px-4">
        <h3 className="text-base font-semibold text-[#1A1A1A]">Quick Access</h3>
        <div className="mt-3 grid grid-cols-4 gap-3 text-center">
          <Link
            href="/visa"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-xs hover:border hover:border-[#008080]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-[#1A1A1A]">Visa Assistant</span>
          </Link>

          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 opacity-60">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-gray-500">Vault (Soon)</span>
          </div>

          <Link
            href="/trips"
            className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-xs hover:border hover:border-[#008080]"
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
