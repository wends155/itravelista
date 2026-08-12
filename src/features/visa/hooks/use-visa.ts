'use client';

import { useQuery } from '@tanstack/react-query';
import { getVisaCountries, getVisaByCountryCode } from '../actions/visa-actions';

export const VISA_KEYS = {
  all: ['visa-countries'] as const,
  detail: (code: string) => ['visa-country', code] as const,
};

export function useVisaCountries() {
  return useQuery({
    queryKey: VISA_KEYS.all,
    queryFn: async () => {
      const res = await getVisaCountries();
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
  });
}

export function useVisaCountry(countryCode: string) {
  return useQuery({
    queryKey: VISA_KEYS.detail(countryCode),
    queryFn: async () => {
      const res = await getVisaByCountryCode(countryCode);
      if (res.error) throw new Error(res.error.message);
      return res.data;
    },
    enabled: !!countryCode,
  });
}
