import type { VisaType } from '@/lib/constants';

export interface VisaRequirementDetail {
  item: string;
  description?: string;
  required: boolean;
}

export interface VisaFee {
  currency: string;
  amount: number;
  notes?: string;
}

export interface VisaCountryData {
  country_code: string;
  country_name: string;
  visa_type: VisaType;
  requirements: VisaRequirementDetail[];
  processing_time?: string;
  fees?: VisaFee;
  embassy_url?: string;
  last_verified: string;
}

export type VisaStep = 1 | 2 | 3 | 4; // 1: Requirements, 2: Documents, 3: Apply, 4: Done
