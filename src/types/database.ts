import { z } from 'zod';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  auth_provider: string;
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  destination: string;
  country_code: string;
  start_date: string;
  end_date: string;
  cover_image_url: string | null;
  status: 'planning' | 'upcoming' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface ChecklistItem {
  id: string;
  trip_id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'completed';
  category: 'documents' | 'booking' | 'insurance' | 'money' | 'general';
  sort_order: number;
  is_auto_generated: boolean;
  created_at: string;
  updated_at: string;
}

export interface BudgetEntry {
  id: string;
  trip_id: string;
  category: 'flights' | 'accommodation' | 'food' | 'transportation' | 'activities' | 'other';
  label: string;
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetTemplate {
  id: string;
  destination: string;
  duration_days: number;
  entries: Json;
  created_at: string;
}

export interface VisaRequirement {
  id: string;
  country_code: string;
  country_name: string;
  visa_type: 'visa_free' | 'visa_on_arrival' | 'e_visa' | 'embassy_visa';
  requirements: Json;
  processing_time: string | null;
  fees: Json | null;
  last_verified: string;
  created_at: string;
  updated_at: string;
}

// Validation Schemas (Zod)

export const tripSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  destination: z.string().min(1, 'Destination is required'),
  country_code: z.string().length(2, 'Country code must be 2 characters'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  cover_image_url: z.string().nullable().optional(),
});

export const checklistItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'completed']).default('todo'),
  category: z.enum(['documents', 'booking', 'insurance', 'money', 'general']).default('general'),
  sort_order: z.number().default(0),
});

export const budgetEntrySchema = z.object({
  category: z.enum(['flights', 'accommodation', 'food', 'transportation', 'activities', 'other']),
  label: z.string().min(1, 'Label is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('PHP'),
});

// Database Type definition for Supabase Generic
export interface Database {
  public: {
    Tables: {
      user_profile: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id'>>;
      };
      trip: {
        Row: Trip;
        Insert: Omit<Trip, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Trip, 'id'>>;
      };
      checklist_item: {
        Row: ChecklistItem;
        Insert: Omit<ChecklistItem, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<ChecklistItem, 'id'>>;
      };
      budget_entry: {
        Row: BudgetEntry;
        Insert: Omit<BudgetEntry, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<BudgetEntry, 'id'>>;
      };
      budget_template: {
        Row: BudgetTemplate;
        Insert: Omit<BudgetTemplate, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<BudgetTemplate, 'id'>>;
      };
      visa_requirement: {
        Row: VisaRequirement;
        Insert: Omit<VisaRequirement, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<VisaRequirement, 'id'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
