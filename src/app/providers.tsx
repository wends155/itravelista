'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/store/query-client';
import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { OfflineBanner } from '@/components/shared/offline-banner';
import { useGuestMigration } from '@/features/auth/hooks/use-guest-migration';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const setOffline = useAppStore((state) => state.setOffline);

  // Trigger migration if user signed up after guest usage
  useGuestMigration();

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOffline]);

  return (
    <QueryClientProvider client={queryClient}>
      <OfflineBanner />
      {children}
    </QueryClientProvider>
  );
}
