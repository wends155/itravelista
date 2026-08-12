'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { guestStorage } from '@/lib/storage/guest-storage';

export function useGuestMigration() {
  useEffect(() => {
    async function migrateData() {
      const guestTrips = guestStorage.getTrips();
      if (guestTrips.length === 0) return;

      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      try {
        for (const trip of guestTrips) {
          const { data: newTrip } = await (supabase as any)
            .from('trip')
            .insert({
              user_id: session.user.id,
              title: trip.title,
              destination: trip.destination,
              country_code: trip.country_code,
              start_date: trip.start_date,
              end_date: trip.end_date,
              status: trip.status,
            })
            .select()
            .single();

          if (newTrip) {
            // Migrate checklist items for this trip
            const localChecklist = guestStorage.getChecklistItems(trip.id);
            if (localChecklist.length > 0) {
              const checklistRows = localChecklist.map((item) => ({
                trip_id: newTrip.id,
                title: item.title,
                description: item.description,
                category: item.category,
                status: item.status,
              }));
              await (supabase as any).from('checklist_item').insert(checklistRows);
            }

            // Migrate budget entries for this trip
            const localBudget = guestStorage.getBudgetEntries(trip.id);
            if (localBudget.length > 0) {
              const budgetRows = localBudget.map((entry) => ({
                trip_id: newTrip.id,
                category: entry.category,
                label: entry.label,
                amount: entry.amount,
                currency: entry.currency,
              }));
              await (supabase as any).from('budget_entry').insert(budgetRows);
            }
          }
        }

        // Clear local storage after successful migration
        guestStorage.clearAll();
      } catch (err) {
        console.error('Error during guest data migration:', err);
      }
    }

    migrateData();
  }, []);
}
