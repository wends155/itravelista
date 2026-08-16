'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, ShieldCheck, CheckSquare, Wallet, Plane, User, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/shared/bottom-nav';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { signOut } from '@/features/auth/actions/auth-actions';

const desktopNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'My Trips', href: '/trips', icon: MapPin },
  { label: 'Visa Assistant', href: '/visa', icon: ShieldCheck },
  { label: 'Smart Checklist', href: '/checklist', icon: CheckSquare },
  { label: 'Budget Planner', href: '/budget', icon: Wallet },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const displayName = user?.user_metadata?.display_name || 'Traveler';
  const email = user?.email || '';
  const initials = (displayName || email || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

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

        {/* User Card */}
        <div className="border-t border-[#E0E0E0] p-4">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-[#E0F2F1]" />
              <div className="flex-1">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mt-1 h-3 w-32 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ) : user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#008080] text-xs font-bold text-white shadow-xs">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1A1A1A] truncate">{displayName}</p>
                  <p className="text-xs text-[#6C757D] truncate">{email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-[#E0F2F1] hover:text-[#008080] transition-colors"
                >
                  <User className="h-4 w-4 text-[#008080]" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#D0021B] hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008080] py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#006B6B]"
            >
              <LogIn className="h-4 w-4" />
              <span>Login / Sign Up</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        <main className="flex-1 pb-[68px] md:pb-6">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}

