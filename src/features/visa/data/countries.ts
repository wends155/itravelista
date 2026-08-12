import type { VisaCountryData } from '../types';

export const VISA_COUNTRIES: VisaCountryData[] = [
  {
    country_code: 'JP',
    country_name: 'Japan',
    visa_type: 'embassy_visa',
    processing_time: '5-7 business days',
    fees: { currency: 'PHP', amount: 1200, notes: 'Accredited agency service fee' },
    embassy_url: 'https://www.ph.emb-japan.go.jp/itpr_en/visa.html',
    last_verified: '2026-08-01',
    requirements: [
      { item: 'Valid Passport', description: 'Must be valid for 6+ months with at least 2 blank pages', required: true },
      { item: 'Visa Application Form', description: 'Downloaded from Japanese Embassy Manila website', required: true },
      { item: '2x2 Passport Photo (4.5cm x 4.5cm)', description: 'White background, taken within last 6 months', required: true },
      { item: 'PSA Birth Certificate', description: 'Issued within 1 year by PSA', required: true },
      { item: 'Bank Certificate', description: 'Original bank balance certificate issued within 1 month', required: true },
      { item: 'Bank Statement (3 Months)', description: 'Official transaction statement', required: true },
      { item: 'Income Tax Return (ITR)', description: 'Form 2316 copy', required: true },
      { item: 'Certificate of Employment', description: 'With position, salary, and approved leave date', required: true },
      { item: 'Daily Schedule / Itinerary', description: 'Day-by-day plan with hotel contact details', required: true },
    ],
  },
  {
    country_code: 'KR',
    country_name: 'South Korea',
    visa_type: 'embassy_visa',
    processing_time: '7-10 business days',
    fees: { currency: 'PHP', amount: 0, notes: 'Gratis for stays up to 59 days' },
    embassy_url: 'https://overseas.mofa.go.kr/ph-en/index.do',
    last_verified: '2026-08-01',
    requirements: [
      { item: 'Valid Passport', description: 'Original passport valid for more than 6 months', required: true },
      { item: 'Visa Application Form', description: 'Filled out completely with passport photo glued', required: true },
      { item: 'Certificate of Employment', description: 'Original with company letterhead, tenure, salary', required: true },
      { item: 'Bank Certificate', description: 'Original bank balance certificate', required: true },
      { item: 'Bank Statements', description: 'Last 3 months account statement', required: true },
      { item: 'Income Tax Return (ITR)', description: 'Copy of ITR (Form 2316)', required: true },
    ],
  },
  {
    country_code: 'SG',
    country_name: 'Singapore',
    visa_type: 'visa_free',
    processing_time: 'Instant (On Arrival)',
    fees: { currency: 'PHP', amount: 0, notes: 'Free entry up to 30 days' },
    embassy_url: 'https://eservices.ica.gov.sg/sgarrivalcard/',
    last_verified: '2026-08-01',
    requirements: [
      { item: 'Valid Passport', description: 'Valid for at least 6 months from date of entry', required: true },
      { item: 'SG Arrival Card (SGAC)', description: 'Submit online via ICA website within 3 days prior to arrival', required: true },
      { item: 'Return Flight Ticket', description: 'Confirmed onward or return ticket', required: true },
      { item: 'Proof of Accommodation', description: 'Hotel reservation or host address details', required: true },
    ],
  },
  {
    country_code: 'TH',
    country_name: 'Thailand',
    visa_type: 'visa_free',
    processing_time: 'Instant (On Arrival)',
    fees: { currency: 'PHP', amount: 0, notes: 'Free entry up to 30 days' },
    embassy_url: 'https://manila.thaiembassy.org/',
    last_verified: '2026-08-01',
    requirements: [
      { item: 'Valid Passport', description: 'Valid for at least 6 months from date of entry', required: true },
      { item: 'Return Flight Ticket', description: 'Confirmed roundtrip ticket', required: true },
      { item: 'Proof of Funds', description: '10,000 THB per person in cash or card proof', required: true },
    ],
  },
  {
    country_code: 'HK',
    country_name: 'Hong Kong',
    visa_type: 'visa_free',
    processing_time: 'Instant (On Arrival)',
    fees: { currency: 'PHP', amount: 0, notes: 'Free entry up to 14 days' },
    embassy_url: 'https://www.immd.gov.hk/',
    last_verified: '2026-08-01',
    requirements: [
      { item: 'Valid Passport', description: 'Valid for at least 1 month beyond stay duration', required: true },
      { item: 'Return Flight Ticket', description: 'Confirmed return flight ticket', required: true },
      { item: 'Proof of Accommodation', description: 'Confirmed hotel reservation', required: true },
    ],
  },
  {
    country_code: 'TW',
    country_name: 'Taiwan',
    visa_type: 'e_visa',
    processing_time: 'Instant (Online Application)',
    fees: { currency: 'PHP', amount: 0, notes: 'Visa exemption scheme active' },
    embassy_url: 'https://visawebapp.boca.gov.tw/',
    last_verified: '2026-08-01',
    requirements: [
      { item: 'Valid Passport', description: 'Must be valid for 6+ months', required: true },
      { item: 'Return Flight Ticket', description: 'Confirmed return ticket', required: true },
      { item: 'Proof of Accommodation', description: 'Hotel booking or host invitation', required: true },
    ],
  },
];

export function getVisaDataByCode(code: string): VisaCountryData | null {
  return VISA_COUNTRIES.find((c) => c.country_code.toUpperCase() === code.toUpperCase()) || null;
}
