import type { BudgetCategory } from '@/lib/constants';

export interface PresetBudgetEntry {
  category: BudgetCategory;
  label: string;
  amount: number;
}

export interface PresetBudgetTemplate {
  destination: string;
  countryCode: string;
  durationDays: number;
  totalPHP: number;
  entries: PresetBudgetEntry[];
}

export const BUDGET_TEMPLATES: Record<string, PresetBudgetTemplate> = {
  JP: {
    destination: 'Japan',
    countryCode: 'JP',
    durationDays: 7,
    totalPHP: 80000,
    entries: [
      { category: 'flights', label: 'Roundtrip Flight (Manila to Tokyo)', amount: 28000 },
      { category: 'accommodation', label: 'Hotel / Airbnb (7 nights)', amount: 20000 },
      { category: 'food', label: 'Food & Dining (JPY 3,000/day)', amount: 12000 },
      { category: 'transportation', label: 'Suica / JR Pass', amount: 8000 },
      { category: 'activities', label: 'Disneyland & Sightseeing', amount: 7000 },
      { category: 'other', label: 'Shopping & Souvenirs', amount: 5000 },
    ],
  },
  KR: {
    destination: 'South Korea',
    countryCode: 'KR',
    durationDays: 5,
    totalPHP: 50000,
    entries: [
      { category: 'flights', label: 'Roundtrip Flight (Manila to Seoul)', amount: 18000 },
      { category: 'accommodation', label: 'Guesthouse / Hotel (5 nights)', amount: 12000 },
      { category: 'food', label: 'K-BBQ & Street Food', amount: 8000 },
      { category: 'transportation', label: 'T-Money Card & Subway', amount: 5000 },
      { category: 'activities', label: 'Palace Admission & Nami Island', amount: 4000 },
      { category: 'other', label: 'Skincare Shopping', amount: 3000 },
    ],
  },
  SG: {
    destination: 'Singapore',
    countryCode: 'SG',
    durationDays: 3,
    totalPHP: 35000,
    entries: [
      { category: 'flights', label: 'Roundtrip Flight (Manila to Singapore)', amount: 10000 },
      { category: 'accommodation', label: 'Hotel (3 nights)', amount: 12000 },
      { category: 'food', label: 'Hawker Centers & Dining', amount: 6000 },
      { category: 'transportation', label: 'EZ-Link Card / MRT', amount: 3000 },
      { category: 'activities', label: 'Universal Studios Singapore', amount: 2500 },
      { category: 'other', label: 'Souvenirs', amount: 1500 },
    ],
  },
  TH: {
    destination: 'Thailand',
    countryCode: 'TH',
    durationDays: 5,
    totalPHP: 30000,
    entries: [
      { category: 'flights', label: 'Roundtrip Flight (Manila to Bangkok)', amount: 10000 },
      { category: 'accommodation', label: 'Hotel (5 nights)', amount: 7000 },
      { category: 'food', label: 'Street Food & Night Markets', amount: 5000 },
      { category: 'transportation', label: 'BTS & Grab', amount: 3000 },
      { category: 'activities', label: 'Temple Tours & Massage', amount: 3000 },
      { category: 'other', label: 'Chatuchak Shopping', amount: 2000 },
    ],
  },
  HK: {
    destination: 'Hong Kong',
    countryCode: 'HK',
    durationDays: 4,
    totalPHP: 40000,
    entries: [
      { category: 'flights', label: 'Roundtrip Flight (Manila to HK)', amount: 8000 },
      { category: 'accommodation', label: 'Hotel (4 nights)', amount: 15000 },
      { category: 'food', label: 'Dim Sum & Local Cafes', amount: 8000 },
      { category: 'transportation', label: 'Octopus Card / MTR', amount: 4000 },
      { category: 'activities', label: 'Disneyland HK Ticket', amount: 3000 },
      { category: 'other', label: 'Shopping', amount: 2000 },
    ],
  },
};

export function getBudgetTemplate(countryCode: string): PresetBudgetTemplate | null {
  return BUDGET_TEMPLATES[countryCode.toUpperCase()] || null;
}
