import type { Trip, ChecklistItem, BudgetEntry } from '@/types/database';

const GUEST_TRIPS_KEY = 'itravelista_guest_trips';
const GUEST_CHECKLIST_KEY = 'itravelista_guest_checklist';
const GUEST_BUDGET_KEY = 'itravelista_guest_budget';

export const guestStorage = {
  // Trips
  getTrips(): Trip[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(GUEST_TRIPS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTrip(trip: Omit<Trip, 'id' | 'created_at' | 'updated_at'>): Trip {
    const trips = this.getTrips();
    const newTrip: Trip = {
      ...trip,
      id: `guest_trip_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    trips.push(newTrip);
    localStorage.setItem(GUEST_TRIPS_KEY, JSON.stringify(trips));
    return newTrip;
  },

  // Checklist
  getChecklistItems(tripId: string): ChecklistItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(GUEST_CHECKLIST_KEY);
      const all: ChecklistItem[] = data ? JSON.parse(data) : [];
      return all.filter((item) => item.trip_id === tripId);
    } catch {
      return [];
    }
  },

  saveChecklistItem(item: Omit<ChecklistItem, 'id' | 'created_at' | 'updated_at'>): ChecklistItem {
    if (typeof window === 'undefined') return item as ChecklistItem;
    const data = localStorage.getItem(GUEST_CHECKLIST_KEY);
    const all: ChecklistItem[] = data ? JSON.parse(data) : [];
    const newItem: ChecklistItem = {
      ...item,
      id: `guest_item_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    all.push(newItem);
    localStorage.setItem(GUEST_CHECKLIST_KEY, JSON.stringify(all));
    return newItem;
  },

  // Budget
  getBudgetEntries(tripId: string): BudgetEntry[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(GUEST_BUDGET_KEY);
      const all: BudgetEntry[] = data ? JSON.parse(data) : [];
      return all.filter((entry) => entry.trip_id === tripId);
    } catch {
      return [];
    }
  },

  saveBudgetEntry(entry: Omit<BudgetEntry, 'id' | 'created_at' | 'updated_at'>): BudgetEntry {
    if (typeof window === 'undefined') return entry as BudgetEntry;
    const data = localStorage.getItem(GUEST_BUDGET_KEY);
    const all: BudgetEntry[] = data ? JSON.parse(data) : [];
    const newEntry: BudgetEntry = {
      ...entry,
      id: `guest_budget_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    all.push(newEntry);
    localStorage.setItem(GUEST_BUDGET_KEY, JSON.stringify(all));
    return newEntry;
  },

  // Clear all guest data
  clearAll() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(GUEST_TRIPS_KEY);
    localStorage.removeItem(GUEST_CHECKLIST_KEY);
    localStorage.removeItem(GUEST_BUDGET_KEY);
  },
};
