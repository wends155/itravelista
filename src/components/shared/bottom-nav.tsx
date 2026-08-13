'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, CheckSquare, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'My Trips', href: '/trips', icon: MapPin },
  { label: 'Checklist', href: '/checklist', icon: CheckSquare },
  { label: 'Assistant', href: '#', icon: MessageCircle, disabled: true },
  { label: 'Profile', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-[#E0E0E0] bg-white px-2 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

        if (item.disabled) {
          return (
            <div
              key={item.label}
              className="group relative flex flex-1 flex-col items-center justify-center py-1 text-[#ADB5BD] cursor-not-allowed"
              title="Coming Soon"
            >
              <Icon className="h-5 w-5" />
              <span className="mt-1 text-xs font-medium">{item.label}</span>
              <span className="absolute -top-8 rounded bg-gray-800 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                Soon
              </span>
            </div>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center py-1 transition-colors',
              isActive ? 'text-[#008080]' : 'text-[#6C757D] hover:text-[#008080]'
            )}
          >
            <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
            <span className={cn('mt-1 text-xs', isActive ? 'font-semibold' : 'font-normal')}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
