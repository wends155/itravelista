import { describe, it, expect } from 'vitest';
import {
  getChecklistItemsForDestination,
  UNIVERSAL_CHECKLIST_ITEMS,
  DESTINATION_SPECIFIC_TEMPLATES,
} from '@/features/checklist/templates/checklist-templates';

describe('Checklist Templates', () => {
  it('includes universal checklist items for all destinations', () => {
    const items = getChecklistItemsForDestination('JP');
    UNIVERSAL_CHECKLIST_ITEMS.forEach((univ) => {
      expect(items.some((item) => item.title === univ.title)).toBe(true);
    });
  });

  it('includes destination-specific visa items for Japan (JP)', () => {
    const items = getChecklistItemsForDestination('JP');
    const japanSpecific = DESTINATION_SPECIFIC_TEMPLATES['JP'] || [];
    japanSpecific.forEach((spec) => {
      expect(items.some((item) => item.title === spec.title)).toBe(true);
    });
  });

  it('handles unknown country codes gracefully by returning universal items', () => {
    const items = getChecklistItemsForDestination('XX');
    expect(items.length).toBe(UNIVERSAL_CHECKLIST_ITEMS.length);
  });
});
