'use client';

import { BellOff } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Outside Click Dismiss Backdrop */}
      <div className="fixed inset-0 z-30" onClick={onClose} aria-hidden="true" />

      {/* Dropdown Panel */}
      <div className="absolute right-0 top-full z-40 mt-2 w-72 rounded-2xl border border-[#E0E0E0] bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2">
        <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-2">
          <h3 className="text-xs font-bold text-[#1A1A1A]">Notifications</h3>
          <span className="text-[10px] font-medium text-[#6C757D]">0 new</span>
        </div>

        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
            <BellOff className="h-6 w-6" />
          </div>
          <p className="mt-3 text-xs font-bold text-[#1A1A1A]">No notifications yet</p>
          <p className="mt-1 text-[11px] text-[#6C757D] leading-relaxed">
            We&apos;ll notify you about visa updates, trip reminders, and flight checklists!
          </p>
        </div>
      </div>
    </>
  );
}
