-- SEED DATA FOR BUDGET TEMPLATES
INSERT INTO public.budget_template (destination, duration_days, entries) VALUES
('Japan', 7, '[
  {"category": "flights", "label": "Roundtrip Flight (Manila to Tokyo)", "amount": 28000},
  {"category": "accommodation", "label": "Hotel/Airbnb (7 nights)", "amount": 20000},
  {"category": "food", "label": "Food & Dining (JPY 3,000/day)", "amount": 12000},
  {"category": "transportation", "label": "JR Pass / Suica Card", "amount": 8000},
  {"category": "activities", "label": "Disneyland / Entrance Fees", "amount": 7000},
  {"category": "other", "label": "Shopping & Souvenirs", "amount": 5000}
]'::jsonb),
('South Korea', 5, '[
  {"category": "flights", "label": "Roundtrip Flight (Manila to Seoul)", "amount": 18000},
  {"category": "accommodation", "label": "Hotel/Guesthouse (5 nights)", "amount": 12000},
  {"category": "food", "label": "Food & K-BBQ", "amount": 8000},
  {"category": "transportation", "label": "T-Money Card & Subway", "amount": 5000},
  {"category": "activities", "label": "Palace Admission & Nami Island", "amount": 4000},
  {"category": "other", "label": "Skincare & Shopping", "amount": 3000}
]'::jsonb),
('Singapore', 3, '[
  {"category": "flights", "label": "Roundtrip Flight (Manila to Singapore)", "amount": 10000},
  {"category": "accommodation", "label": "Hotel (3 nights)", "amount": 12000},
  {"category": "food", "label": "Hawker Centers & Dining", "amount": 6000},
  {"category": "transportation", "label": "EZ-Link Card / MRT", "amount": 3000},
  {"category": "activities", "label": "Universal Studios & Gardens by the Bay", "amount": 2500},
  {"category": "other", "label": "Souvenirs", "amount": 1500}
]'::jsonb),
('Thailand', 5, '[
  {"category": "flights", "label": "Roundtrip Flight (Manila to Bangkok)", "amount": 10000},
  {"category": "accommodation", "label": "Hotel (5 nights)", "amount": 7000},
  {"category": "food", "label": "Street Food & Night Markets", "amount": 5000},
  {"category": "transportation", "label": "BTS, MRT & Grab", "amount": 3000},
  {"category": "activities", "label": "Temple Tours & Massage", "amount": 3000},
  {"category": "other", "label": "Shopping at Chatuchak", "amount": 2000}
]'::jsonb),
('Hong Kong', 4, '[
  {"category": "flights", "label": "Roundtrip Flight (Manila to HK)", "amount": 8000},
  {"category": "accommodation", "label": "Hotel (4 nights)", "amount": 15000},
  {"category": "food", "label": "Dim Sum & Local Eats", "amount": 8000},
  {"category": "transportation", "label": "Octopus Card / MTR", "amount": 4000},
  {"category": "activities", "label": "Hong Kong Disneyland", "amount": 3000},
  {"category": "other", "label": "Shopping", "amount": 2000}
]'::jsonb)
ON CONFLICT (destination) DO NOTHING;

-- SEED DATA FOR VISA REQUIREMENTS (PH PASSPORT HOLDERS)
INSERT INTO public.visa_requirement (country_code, country_name, visa_type, requirements, processing_time, fees, last_verified) VALUES
('JP', 'Japan', 'embassy_visa', '[
  {"item": "Valid Passport", "description": "Must be valid for 6+ months with at least 2 blank pages", "required": true},
  {"item": "Visa Application Form", "description": "Download from Embassy of Japan website with 2x2 photo", "required": true},
  {"item": "PSA Birth Certificate", "description": "Issued within 1 year by PSA", "required": true},
  {"item": "PSA Marriage Certificate", "description": "If married, issued within 1 year by PSA", "required": false},
  {"item": "Daily Schedule / Itinerary", "description": "Detailed plan of stay with accommodation info", "required": true},
  {"item": "Bank Certificate", "description": "Original bank certificate dated within 1 month", "required": true},
  {"item": "Income Tax Return (ITR)", "description": "Form 2316 copy", "required": true},
  {"item": "Certificate of Employment", "description": "With salary, position, and approved leave date", "required": true}
]'::jsonb, '5-7 business days', '{"currency": "PHP", "amount": 1200, "notes": "Agency handling fee"}'::jsonb, '2026-08-01'),

('KR', 'South Korea', 'embassy_visa', '[
  {"item": "Valid Passport", "description": "Original passport valid for more than 6 months", "required": true},
  {"item": "Visa Application Form", "description": "Filled out completely with passport-sized photo", "required": true},
  {"item": "Certificate of Employment", "description": "Original with company letterhead, tenure, salary", "required": true},
  {"item": "Bank Certificate", "description": "Original bank balance certificate", "required": true},
  {"item": "Bank Statements", "description": "Last 3 months account statement", "required": true},
  {"item": "Income Tax Return (ITR)", "description": "Copy of ITR (Form 2316)", "required": true}
]'::jsonb, '7-10 business days', '{"currency": "PHP", "amount": 0, "notes": "Gratis for stays up to 59 days"}'::jsonb, '2026-08-01'),

('SG', 'Singapore', 'visa_free', '[
  {"item": "Valid Passport", "description": "Valid for at least 6 months from date of entry", "required": true},
  {"item": "SG Arrival Card", "description": "Submit online within 3 days prior to arrival", "required": true},
  {"item": "Return Flight Ticket", "description": "Confirmed onward or return ticket", "required": true},
  {"item": "Proof of Accommodation", "description": "Hotel booking or host address details", "required": true}
]'::jsonb, 'Instant (On Arrival)', '{"currency": "PHP", "amount": 0, "notes": "Free entry up to 30 days"}'::jsonb, '2026-08-01'),

('TH', 'Thailand', 'visa_free', '[
  {"item": "Valid Passport", "description": "Valid for at least 6 months from date of entry", "required": true},
  {"item": "Return Flight Ticket", "description": "Confirmed roundtrip ticket", "required": true},
  {"item": "Proof of Funds", "description": "10,000 THB per person in cash or card proof", "required": true}
]'::jsonb, 'Instant (On Arrival)', '{"currency": "PHP", "amount": 0, "notes": "Free entry up to 30 days"}'::jsonb, '2026-08-01'),

('HK', 'Hong Kong', 'visa_free', '[
  {"item": "Valid Passport", "description": "Valid for at least 1 month beyond stay duration", "required": true},
  {"item": "Return Flight Ticket", "description": "Confirmed return/onward flight ticket", "required": true},
  {"item": "Proof of Accommodation", "description": "Confirmed hotel reservation", "required": true}
]'::jsonb, 'Instant (On Arrival)', '{"currency": "PHP", "amount": 0, "notes": "Free entry up to 14 days"}'::jsonb, '2026-08-01')
ON CONFLICT (country_code) DO NOTHING;

-- SEED DEV TEST USER (dev@itravelista.ph / password123)
-- Uses PostgreSQL pgcrypto extensions.crypt function for valid bcrypt hashing
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  last_sign_in_at,
  email_change_token_current,
  phone_change_token,
  reauthentication_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'authenticated',
  'authenticated',
  'dev@itravelista.ph',
  extensions.crypt('password123', extensions.gen_salt('bf')),
  NOW(),
  '',
  '',
  '',
  '',
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"display_name":"Dev Tester"}'::jsonb,
  FALSE,
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_profile (id, email, display_name, auth_provider)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'dev@itravelista.ph',
  'Dev Tester',
  'email'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '{"sub":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","email":"dev@itravelista.ph"}'::jsonb,
  'email',
  'dev@itravelista.ph',
  NOW(),
  NOW(),
  NOW()
) ON CONFLICT (provider, provider_id) DO NOTHING;



