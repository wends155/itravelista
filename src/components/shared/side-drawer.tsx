'use client';

import Link from 'next/link';
import { X, MapPin, ShieldCheck, CheckSquare, Wallet, LogIn, Plane, User, LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { signOut } from '@/features/auth/actions/auth-actions';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const { user } = useAuth();

  if (!isOpen) return null;

  const navItems = [
    { label: 'My Trips', href: '/trips', icon: MapPin },
    { label: 'Visa Assistant', href: '/visa', icon: ShieldCheck },
    { label: 'Smart Checklist', href: '/checklist', icon: CheckSquare },
    { label: 'Budget Planner', href: '/budget', icon: Wallet },
  ];

  const displayName = user?.user_metadata?.display_name || 'Traveler';
  const email = user?.email || '';
  const initials = (displayName || email || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    onClose();
    await signOut();
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
      <aside className="fixed top-0 bottom-0 left-0 z-[60] flex h-full w-72 flex-col bg-white shadow-2xl transition-transform">
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
            className="rounded-full p-1.5 text-[#6C757D] hover:bg-gray-100 hover:text-[#1A1A1A] min-h-11 min-w-11 flex items-center justify-center"
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
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-left font-medium text-[#1A1A1A] transition-colors hover:bg-[#E0F2F1] hover:text-[#008080]"
              >
                <Icon className="h-5 w-5 text-[#008080]" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTA Section */}
        <div className="border-t border-[#E0E0E0] p-4">
          {user ? (
            <div className="flex flex-col gap-3">
              {/* User Card */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#008080] text-xs font-bold text-white shadow-xs">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1A1A1A] truncate">{displayName}</p>
                  <p className="text-xs text-[#6C757D] truncate">{email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-1.5 pt-1">
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-[#E0F2F1] hover:text-[#008080] transition-colors"
                >
                  <User className="h-4 w-4 text-[#008080]" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#D0021B] hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008080] py-2.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-[#006B6B]"
            >
              <LogIn className="h-4 w-4" />
              <span>Login / Sign Up</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

