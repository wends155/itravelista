'use server';

import { ok, err, Result } from '@/lib/errors';
import type { VisaCountryData } from '../types';
import { VISA_COUNTRIES, getVisaDataByCode } from '../data/countries';
import { generateChecklistForTrip } from '@/features/checklist/actions/checklist-actions';

export async function getVisaCountries(): Promise<Result<VisaCountryData[]>> {
  return ok(VISA_COUNTRIES);
}

export async function getVisaByCountryCode(code: string): Promise<Result<VisaCountryData>> {
  const data = getVisaDataByCode(code);
  if (!data) {
    return err('COUNTRY_NOT_FOUND', `Visa information for country code ${code} not found`);
  }
  return ok(data);
}

export async function copyVisaRequirementsToChecklist(
  tripId: string,
  countryCode: string
): Promise<Result<unknown>> {
  return await generateChecklistForTrip(tripId, countryCode);
}
