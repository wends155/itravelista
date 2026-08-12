'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useAppStore } from '@/store/app-store';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isGuestMode = useAppStore((state) => state.isGuestMode);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error fetching auth user:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user || isGuestMode,
    isGuest: isGuestMode && !user,
  };
}
