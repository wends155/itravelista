'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-4 py-8">
      <EmptyState
        icon={AlertTriangle}
        title="Something went wrong"
        description={error.message || 'An unexpected error occurred while loading this page.'}
        action={
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-[#008080] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#006B6B]"
          >
            Try Again
          </button>
        }
      />
    </div>
  );
}
