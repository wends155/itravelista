import { AuthForm } from '@/features/auth/components/auth-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-start sm:justify-center overflow-y-auto bg-gradient-to-b from-[#E0F2F1] to-[#F8F9FA] px-4 py-6 sm:py-8">
      <div className="mb-4 sm:mb-6 text-center">
        <Link href="/" className="inline-block">
          <h1 className="text-2xl font-black text-[#008080]">ITravelista PH</h1>
          <p className="text-xs font-medium text-[#6C757D]">From Dreaming to Departing</p>
        </Link>
      </div>

      <AuthForm mode="login" />
    </div>
  );
}
