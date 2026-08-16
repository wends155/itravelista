'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { signOut } from '@/features/auth/actions/auth-actions';
import { User, Mail, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated, isGuest } = useAuth();

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-lg flex-col md:max-w-2xl">
        <PageHeader title="Profile" showBack={true} backHref="/" />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#008080] border-t-transparent" />
        </div>
      </div>
    );
  }

  // Guest users / unauthenticated prompt
  if (!user) {
    return (
      <div className="mx-auto flex max-w-lg flex-col md:max-w-2xl">
        <PageHeader title="Profile" showBack={true} backHref="/" />
        <section className="flex flex-col items-center gap-4 px-4 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
            <User className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-bold text-[#1A1A1A]">
            {isGuest ? 'Browsing as Guest' : 'Sign in to view your profile'}
          </h2>
          <p className="text-xs text-[#6C757D]">
            Create an account or sign in to save your trips, checklists, and budgets.
          </p>
          <Link
            href="/login"
            className="mt-2 rounded-full bg-[#008080] px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#006B6B]"
          >
            Sign In / Sign Up
          </Link>
        </section>
      </div>
    );
  }

  // Authenticated user profile
  const displayName = user.user_metadata?.display_name || 'Traveler';
  const email = user.email || '';
  const initials = (displayName || email || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col md:max-w-2xl">
      <PageHeader title="Profile" showBack={true} backHref="/" />
      <section className="flex flex-col gap-4 px-4 py-6">
        {/* Avatar + Name Card */}
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-2xs">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#008080] text-2xl font-bold text-white shadow-md">
            {initials}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-[#1A1A1A]">{displayName}</h2>
            <p className="text-xs text-[#6C757D]">{email}</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="flex flex-col rounded-2xl bg-white shadow-2xs">
          <div className="flex items-center gap-3 border-b border-[#F0F0F0] px-4 py-3.5">
            <Mail className="h-4 w-4 text-[#008080]" />
            <div className="flex-1">
              <p className="text-[11px] text-[#6C757D]">Email</p>
              <p className="text-sm font-medium text-[#1A1A1A]">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Shield className="h-4 w-4 text-[#008080]" />
            <div className="flex-1">
              <p className="text-[11px] text-[#6C757D]">Auth Provider</p>
              <p className="text-sm font-medium text-[#1A1A1A] capitalize">
                {user.app_metadata?.provider || 'email'}
              </p>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D0021B]/20 bg-red-50 py-2.5 text-sm font-semibold text-[#D0021B] transition-colors hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </section>
    </div>
  );
}
