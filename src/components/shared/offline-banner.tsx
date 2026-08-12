'use client';

import { useAppStore } from '@/store/app-store';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const isOffline = useAppStore((state) => state.isOffline);

  if (!isOffline) return null;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-[#F5A623] px-4 py-2 text-xs font-bold text-white shadow-sm">
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>You are currently offline. Showing cached travel data.</span>
    </div>
  );
}
