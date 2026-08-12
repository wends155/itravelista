'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function PageHeader({ title, subtitle, showBack = false, rightAction }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#E0E0E0] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A] transition-colors hover:bg-gray-100"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold text-[#1A1A1A] md:text-xl">{title}</h1>
          {subtitle && <p className="text-xs text-[#6C757D]">{subtitle}</p>}
        </div>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
