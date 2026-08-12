'use server';

import { createClient } from '@/lib/supabase/server';
import { ok, err, Result } from '@/lib/errors';
import { redirect } from 'next/navigation';

export async function signInWithEmail(formData: {
  email: string;
  password?: string;
}): Promise<Result<{ redirectTo: string }>> {
  const supabase = await createClient();

  if (!formData.password) {
    return err('INVALID_CREDENTIALS', 'Password is required for email login');
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return err('AUTH_FAILED', error.message);
  }

  return ok({ redirectTo: '/' });
}

export async function signUpWithEmail(formData: {
  email: string;
  password?: string;
  displayName?: string;
}): Promise<Result<{ message: string }>> {
  const supabase = await createClient();

  if (!formData.password) {
    return err('INVALID_CREDENTIALS', 'Password is required');
  }

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        display_name: formData.displayName,
      },
    },
  });

  if (error) {
    return err('AUTH_FAILED', error.message);
  }

  return ok({ message: 'Check your email to confirm your account' });
}

export async function signInWithMagicLink(email: string): Promise<Result<{ message: string }>> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return err('AUTH_FAILED', error.message);
  }

  return ok({ message: 'Magic link sent! Check your inbox.' });
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
