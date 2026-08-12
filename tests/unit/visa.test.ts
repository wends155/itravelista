import { describe, it, expect } from 'vitest';
import { getVisaDataByCode, VISA_COUNTRIES } from '@/features/visa/data/countries';

describe('Visa Data', () => {
  it('finds visa data by country code case-insensitively', () => {
    const japanData = getVisaDataByCode('jp');
    expect(japanData).not.toBeNull();
    expect(japanData?.country_name).toBe('Japan');
    expect(japanData?.visa_type).toBe('embassy_visa');
  });

  it('contains valid requirement details for all curated countries', () => {
    VISA_COUNTRIES.forEach((country) => {
      expect(country.country_code).toBeTruthy();
      expect(country.country_name).toBeTruthy();
      expect(country.requirements.length).toBeGreaterThan(0);
      expect(country.last_verified).toBeTruthy();
    });
  });

  it('returns null for uncurated country code', () => {
    const nullData = getVisaDataByCode('XX');
    expect(nullData).toBeNull();
  });
});
