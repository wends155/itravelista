'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SocialButton } from './social-button';
import { signInWithEmail, signUpWithEmail, signInWithMagicLink } from '../actions/auth-actions';
import { useAppStore } from '@/store/app-store';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const setGuestMode = useAppStore((state) => state.setGuestMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);
    setIsSubmitting(true);

    try {
      if (useMagicLink) {
        const res = await signInWithMagicLink(email);
        if (res.error) {
          setErrorMsg(res.error.message);
        } else {
          setInfoMsg(res.data.message);
        }
      } else if (mode === 'login') {
        const res = await signInWithEmail({ email, password });
        if (res.error) {
          setErrorMsg(res.error.message);
        } else {
          router.push(res.data.redirectTo);
        }
      } else {
        const res = await signUpWithEmail({ email, password, displayName });
        if (res.error) {
          setErrorMsg(res.error.message);
        } else {
          setInfoMsg(res.data.message);
        }
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestAccess = () => {
    setGuestMode(true);
    router.push('/');
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl border border-[#E0E0E0]">
      <SocialButton />

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E0E0E0]" />
        </div>
        <span className="relative bg-white px-3 text-xs font-medium text-[#6C757D]">
          or continue with email
        </span>
      </div>

      {errorMsg && (
        <div className="rounded-xl bg-red-50 p-3 text-xs text-[#D0021B] border border-red-200">
          {errorMsg}
        </div>
      )}

      {infoMsg && (
        <div className="rounded-xl bg-emerald-50 p-3 text-xs text-[#008080] border border-emerald-200">
          {infoMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'signup' && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#1A1A1A]">Full Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 h-4 w-4 text-[#6C757D]" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Juan dela Cruz"
                className="w-full rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] py-2.5 pl-10 pr-3 text-sm focus:border-[#008080] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#1A1A1A]">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 h-4 w-4 text-[#6C757D]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan@example.com"
              className="w-full rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] py-2.5 pl-10 pr-3 text-sm focus:border-[#008080] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {!useMagicLink && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#1A1A1A]">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-[#6C757D]" />
              <input
                type="password"
                required={!useMagicLink}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E0E0E0] bg-[#F8F9FA] py-2.5 pl-10 pr-3 text-sm focus:border-[#008080] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setUseMagicLink(!useMagicLink)}
            className="text-[#008080] hover:underline font-medium"
          >
            {useMagicLink ? 'Use password instead' : 'Send passwordless magic link'}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#008080] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006B6B] disabled:opacity-50"
        >
          {isSubmitting
            ? 'Processing...'
            : useMagicLink
            ? 'Send Magic Link'
            : mode === 'login'
            ? 'Sign In'
            : 'Create Account'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="flex flex-col items-center gap-3 border-t border-[#E0E0E0] pt-4 text-center">
        {mode === 'login' ? (
          <p className="text-xs text-[#6C757D]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-[#008080] hover:underline">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-xs text-[#6C757D]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#008080] hover:underline">
              Sign In
            </Link>
          </p>
        )}

        <button
          type="button"
          onClick={handleGuestAccess}
          className="text-xs font-semibold text-[#6C757D] hover:text-[#1A1A1A] underline"
        >
          Continue as Guest (No Account Required)
        </button>
      </div>
    </div>
  );
}
