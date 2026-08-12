import Link from 'next/link';
import { Compass } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-4 py-8">
      <EmptyState
        icon={Compass}
        title="Page Not Found (404)"
        description="Looks like you've wandered off the itinerary. The destination you are looking for doesn't exist."
        action={
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#008080] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#006B6B]"
          >
            Back to Dashboard
          </Link>
        }
      />
    </div>
  );
}
