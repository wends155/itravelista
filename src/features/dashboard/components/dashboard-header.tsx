'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, User } from 'lucide-react';
import { SideDrawer } from '@/components/shared/side-drawer';
import { NotificationDropdown } from '@/components/shared/notification-dropdown';
import { useAuth } from '@/features/auth/hooks/use-auth';

export function DashboardHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();

  const displayName = user?.user_metadata?.display_name || 'Traveler';
  const initials = (displayName || user?.email || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <header className="relative flex items-center justify-between bg-white px-4 py-3 shadow-xs">
        {/* Menu Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-full p-1 text-[#1A1A1A] transition-colors hover:bg-gray-100 min-h-11 min-w-11 flex items-center justify-center"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-lg font-black tracking-tight text-[#008080]">ITravelista PH</h1>
          <p className="font-[family-name:var(--font-cursive)] text-xs font-bold text-[#6C757D]">
            From Dreaming to Departing
          </p>
        </div>

        {/* Right Action Container (Notifications + Auth) */}
        <div className="flex items-center gap-1.5">
          {/* Notification Bell Button */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className="relative rounded-full p-1 text-[#1A1A1A] transition-colors hover:bg-gray-100 min-h-9 min-w-9 flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {/* Unread Notification Dot */}
              <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008080] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#008080]" />
              </span>
            </button>

            <NotificationDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>

          {/* Auth-aware Avatar / Sign In */}
          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-[#E0F2F1]" />
          ) : !isAuthenticated ? (
            <Link
              href="/login"
              className="rounded-full bg-[#008080] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#006B6B]"
            >
              Sign In
            </Link>
          ) : user ? (
            <Link
              href="/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#008080] text-xs font-bold text-white transition-transform hover:scale-105"
              title="View Profile"
            >
              {initials}
            </Link>
          ) : (
            <Link
              href="/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080] transition-transform hover:scale-105"
              title="Guest Profile"
            >
              <User className="h-4 w-4" />
            </Link>
          )}
        </div>
      </header>

      {/* Side Drawer */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}

