export const BUDGET_CATEGORIES = [
  { value: 'flights', label: 'Flights', color: '#4A90E2' },
  { value: 'accommodation', label: 'Accommodation', color: '#008080' },
  { value: 'food', label: 'Food', color: '#F5A623' },
  { value: 'transportation', label: 'Transportation', color: '#D0021B' },
  { value: 'activities', label: 'Activities', color: '#7B61FF' },
  { value: 'other', label: 'Other', color: '#9B9B9B' },
] as const;

export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number]['value'];

export const CHECKLIST_CATEGORIES = [
  { value: 'documents', label: 'Documents' },
  { value: 'booking', label: 'Booking' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'money', label: 'Money' },
  { value: 'general', label: 'General' },
] as const;

export type ChecklistCategory = (typeof CHECKLIST_CATEGORIES)[number]['value'];

export const CHECKLIST_STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
] as const;

export type ChecklistStatus = (typeof CHECKLIST_STATUSES)[number]['value'];

export const TRIP_STATUSES = [
  { value: 'planning', label: 'Planning' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
] as const;

export type TripStatus = (typeof TRIP_STATUSES)[number]['value'];

export const VISA_TYPES = [
  { value: 'visa_free', label: 'Visa-Free' },
  { value: 'visa_on_arrival', label: 'Visa on Arrival' },
  { value: 'e_visa', label: 'eVisa' },
  { value: 'embassy_visa', label: 'Embassy Visa' },
] as const;

export type VisaType = (typeof VISA_TYPES)[number]['value'];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  TRIPS: '/trips',
  TRIP_NEW: '/trips/new',
  TRIP_DETAIL: (id: string) => `/trips/${id}`,
  CHECKLIST: (tripId: string) => `/checklist/${tripId}`,
  BUDGET: (tripId: string) => `/budget/${tripId}`,
  VISA: (countryCode?: string) => (countryCode ? `/visa/${countryCode}` : '/visa'),
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'My Trips', href: '/trips', icon: 'MapPin' },
  { label: 'Checklist', href: '/checklist', icon: 'CheckSquare' },
  { label: 'Assistant', href: '#', icon: 'MessageCircle', disabled: true },
  { label: 'Profile', href: '/profile', icon: 'User' },
] as const;
