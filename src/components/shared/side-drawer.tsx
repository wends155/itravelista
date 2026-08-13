'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, MapPin, ShieldCheck, CheckSquare, Wallet, LogIn, Plane } from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const navItems = [
    { label: 'My Trips', href: '/trips', icon: MapPin },
    { label: 'Visa Assistant', href: '/visa', icon: ShieldCheck },
    { label: 'Smart Checklist', href: '/checklist', icon: CheckSquare },
    { label: 'Budget Planner', href: '/budget', icon: Wallet },
  ];

  const handleNavClick = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="fixed top-0 bottom-0 left-0 z-[60] flex w-72 flex-col bg-white shadow-2xl transition-transform">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E0E0E0] p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0F2F1] text-[#008080]">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#008080]">ITravelista PH</h2>
              <p className="font-[family-name:var(--font-cursive)] text-xs font-bold text-[#6C757D]">
                From Dreaming to Departing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#6C757D] hover:bg-gray-100 hover:text-[#1A1A1A]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-left font-medium text-[#1A1A1A] transition-colors hover:bg-[#E0F2F1] hover:text-[#008080]"
              >
                <Icon className="h-5 w-5 text-[#008080]" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-[#E0E0E0] p-4">
          <Link
            href="/login"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008080] py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#006B6B]"
          >
            <LogIn className="h-4 w-4" />
            <span>Login / Sign Up</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
