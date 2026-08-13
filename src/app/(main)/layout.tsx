'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, ShieldCheck, CheckSquare, Wallet, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/shared/bottom-nav';

const desktopNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'My Trips', href: '/trips', icon: MapPin },
  { label: 'Visa Assistant', href: '/visa', icon: ShieldCheck },
  { label: 'Smart Checklist', href: '/checklist', icon: CheckSquare },
  { label: 'Budget Planner', href: '/budget', icon: Wallet },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Desktop Persistent Sidebar — hidden on mobile, visible on md+ */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-[#E0E0E0] md:bg-white">
        {/* Brand Header */}
        <div className="flex items-center gap-3 border-b border-[#E0E0E0] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2F1] text-[#008080]">
            <Plane className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#008080]">ITravelista PH</h2>
            <p className="font-[family-name:var(--font-cursive)] text-xs font-bold text-[#6C757D]">
              From Dreaming to Departing
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#E0F2F1] text-[#008080] font-bold'
                    : 'text-[#1A1A1A] hover:bg-[#E0F2F1]/50 hover:text-[#008080]'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive ? 'text-[#008080]' : 'text-[#6C757D]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 pb-20 md:pb-6">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}

