-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER PROFILE TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.user_profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'email',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TRIP TABLE
CREATE TABLE IF NOT EXISTS public.trip (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profile(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  country_code VARCHAR(2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cover_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'upcoming', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CHECKLIST ITEM TABLE
CREATE TABLE IF NOT EXISTS public.checklist_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trip(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed')),
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('documents', 'booking', 'insurance', 'money', 'general')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_auto_generated BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. BUDGET ENTRY TABLE
CREATE TABLE IF NOT EXISTS public.budget_entry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trip(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('flights', 'accommodation', 'food', 'transportation', 'activities', 'other')),
  label TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'PHP',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. BUDGET TEMPLATE TABLE (Read-Only Seed Data)
CREATE TABLE IF NOT EXISTS public.budget_template (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination TEXT NOT NULL UNIQUE,
  duration_days INTEGER NOT NULL,
  entries JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. VISA REQUIREMENT TABLE (Read-Only Seed Data)
CREATE TABLE IF NOT EXISTS public.visa_requirement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code VARCHAR(2) NOT NULL UNIQUE,
  country_name TEXT NOT NULL,
  visa_type TEXT NOT NULL CHECK (visa_type IN ('visa_free', 'visa_on_arrival', 'e_visa', 'embassy_visa')),
  requirements JSONB NOT NULL,
  processing_time TEXT,
  fees JSONB,
  last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_trip_user_id ON public.trip(user_id);
CREATE INDEX IF NOT EXISTS idx_checklist_trip_id ON public.checklist_item(trip_id);
CREATE INDEX IF NOT EXISTS idx_budget_trip_id ON public.budget_entry(trip_id);

-- RLS POLICIES
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_item ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_entry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_template ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_requirement ENABLE ROW LEVEL SECURITY;

-- User Profile RLS
CREATE POLICY "Users can view own profile" ON public.user_profile FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profile FOR UPDATE USING (auth.uid() = id);

-- Trip RLS
CREATE POLICY "Users can CRUD own trips" ON public.trip FOR ALL USING (auth.uid() = user_id);

-- Checklist Item RLS
CREATE POLICY "Users can CRUD own trip checklist items" ON public.checklist_item
  FOR ALL USING (EXISTS (SELECT 1 FROM public.trip WHERE trip.id = checklist_item.trip_id AND trip.user_id = auth.uid()));

-- Budget Entry RLS
CREATE POLICY "Users can CRUD own trip budget entries" ON public.budget_entry
  FOR ALL USING (EXISTS (SELECT 1 FROM public.trip WHERE trip.id = budget_entry.trip_id AND trip.user_id = auth.uid()));

-- Read-Only Tables RLS
CREATE POLICY "Public read budget templates" ON public.budget_template FOR SELECT USING (TRUE);
CREATE POLICY "Public read visa requirements" ON public.visa_requirement FOR SELECT USING (TRUE);

-- AUTO-CREATE USER PROFILE TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profile (id, email, display_name, avatar_url, auth_provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name'),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
