'use client';

import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { SideDrawer } from '@/components/shared/side-drawer';
import { NotificationDropdown } from '@/components/shared/notification-dropdown';

export function DashboardHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <header className="relative flex items-center justify-between bg-white px-4 py-3 shadow-xs">
        {/* Menu Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-full p-1 text-[#1A1A1A] transition-colors hover:bg-gray-100"
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

        {/* Notification Bell Button & Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="rounded-full p-1 text-[#1A1A1A] transition-colors hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
          </button>

          <NotificationDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />
        </div>
      </header>

      {/* Side Drawer */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
