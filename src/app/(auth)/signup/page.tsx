import { AuthForm } from '@/features/auth/components/auth-form';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#E0F2F1] to-[#F8F9FA] px-4 py-8">
      <div className="mb-6 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-2xl font-black text-[#008080]">ITravelista PH</h1>
          <p className="text-xs font-medium text-[#6C757D]">From Dreaming to Departing</p>
        </Link>
      </div>

      <AuthForm mode="signup" />
    </div>
  );
}
