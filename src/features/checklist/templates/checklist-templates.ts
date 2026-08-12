import type { ChecklistCategory } from '@/lib/constants';

export interface TemplateChecklistItem {
  title: string;
  category: ChecklistCategory;
  description?: string;
}

export const UNIVERSAL_CHECKLIST_ITEMS: TemplateChecklistItem[] = [
  {
    title: 'Valid Passport (6+ months validity)',
    category: 'documents',
    description: 'Ensure passport has at least 6 months validity from planned departure date.',
  },
  {
    title: 'Roundtrip Flight Booking Confirmation',
    category: 'booking',
    description: 'Print or save offline copy of your flight itinerary.',
  },
  {
    title: 'Hotel / Accommodation Reservation',
    category: 'booking',
    description: 'Save hotel voucher with complete address and contact details.',
  },
  {
    title: 'Travel Insurance Policy',
    category: 'insurance',
    description: 'Comprehensive medical and trip cancellation insurance.',
  },
  {
    title: 'Foreign Currency / Pocket Money',
    category: 'money',
    description: 'Exchange PHP to destination currency or prepare international credit/debit card.',
  },
];

export const DESTINATION_SPECIFIC_TEMPLATES: Record<string, TemplateChecklistItem[]> = {
  JP: [
    {
      title: 'Japan Visa Application Form',
      category: 'documents',
      description: 'Downloaded from Embassy of Japan in Manila website.',
    },
    {
      title: '2x2 Passport Photo (4.5cm x 4.5cm)',
      category: 'documents',
      description: 'White background, taken within last 6 months.',
    },
    {
      title: 'PSA Birth Certificate',
      category: 'documents',
      description: 'Issued within 1 year by Philippine Statistics Authority.',
    },
    {
      title: 'Bank Certificate & 3 Months Bank Statement',
      category: 'documents',
      description: 'Original bank certificate issued within 1 month.',
    },
    {
      title: 'Certificate of Employment / BIR Form 2316',
      category: 'documents',
      description: 'Proof of income and approved leave of absence.',
    },
  ],
  KR: [
    {
      title: 'South Korea Visa Application Form',
      category: 'documents',
      description: 'Completed application with passport photo glued.',
    },
    {
      title: 'Bank Certificate (Original)',
      category: 'documents',
      description: 'Bank balance certificate from Philippine bank.',
    },
    {
      title: 'Bank Statement (3 Months)',
      category: 'documents',
      description: 'Official account statement showing transactions.',
    },
    {
      title: 'Certificate of Employment',
      category: 'documents',
      description: 'With company letterhead, tenure, salary, and contact numbers.',
    },
  ],
  SG: [
    {
      title: 'SG Arrival Card Submission',
      category: 'documents',
      description: 'Submit online via ICA website within 3 days before entry.',
    },
  ],
  TH: [
    {
      title: 'Proof of Funds (Cash in THB or USD)',
      category: 'money',
      description: 'At least 10,000 THB equivalent in cash per traveler.',
    },
  ],
};

export function getChecklistItemsForDestination(countryCode: string): TemplateChecklistItem[] {
  const destinationItems = DESTINATION_SPECIFIC_TEMPLATES[countryCode.toUpperCase()] || [];
  return [...UNIVERSAL_CHECKLIST_ITEMS, ...destinationItems];
}
