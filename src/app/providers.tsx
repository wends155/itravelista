'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/store/query-client';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/app-store';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const setOffline = useAppStore((state) => state.setOffline);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      {children}
    </QueryClientProvider>
  );
}
