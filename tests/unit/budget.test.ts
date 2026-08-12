import { describe, it, expect } from 'vitest';
import { getBudgetTemplate, BUDGET_TEMPLATES } from '@/features/budget/templates/budget-templates';

describe('Budget Templates', () => {
  it('returns valid template for Japan (JP)', () => {
    const template = getBudgetTemplate('JP');
    expect(template).not.toBeNull();
    expect(template?.destination).toBe('Japan');
    expect(template?.totalPHP).toBe(80000);
    expect(template?.entries.length).toBeGreaterThan(0);
  });

  it('calculates sum of entries matching totalPHP for all preset templates', () => {
    Object.values(BUDGET_TEMPLATES).forEach((template) => {
      const entrySum = template.entries.reduce((sum, entry) => sum + entry.amount, 0);
      expect(entrySum).toBe(template.totalPHP);
    });
  });

  it('returns null for unknown country codes', () => {
    const template = getBudgetTemplate('ZZ');
    expect(template).toBeNull();
  });
});
