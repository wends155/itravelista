'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  backHref,
  rightAction,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#E0E0E0] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 min-w-0">
        {showBack &&
          (backHref ? (
            <Link
              href={backHref}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#1A1A1A] transition-colors hover:bg-gray-100 active:bg-gray-200"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#1A1A1A] transition-colors hover:bg-gray-100 active:bg-gray-200"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          ))}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-[#1A1A1A] md:text-xl">{title}</h1>
          {subtitle && <p className="truncate text-xs text-[#6C757D]">{subtitle}</p>}
        </div>
      </div>
      {rightAction && <div className="shrink-0 ml-2">{rightAction}</div>}
    </header>
  );
}
