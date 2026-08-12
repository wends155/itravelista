import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, daysUntil, getTripStatus, percentage } from '@/lib/utils';

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('px-2', 'py-2')).toBe('px-2 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('bg-red-500', false && 'text-white', 'p-4')).toBe('bg-red-500 p-4');
  });
});

describe('formatCurrency', () => {
  it('formats numeric amounts to PHP currency format', () => {
    const formatted = formatCurrency(80000);
    expect(formatted).toContain('80,000');
  });

  it('handles zero correctly', () => {
    const formatted = formatCurrency(0);
    expect(formatted).toContain('0');
  });
});

describe('daysUntil', () => {
  it('returns positive integer for future dates', () => {
    const future = new Date();
    future.setDate(future.getDate() + 10);
    expect(daysUntil(future)).toBe(10);
  });

  it('returns negative integer for past dates', () => {
    const past = new Date();
    past.setDate(past.getDate() - 5);
    expect(daysUntil(past)).toBe(-5);
  });
});

describe('getTripStatus', () => {
  it('returns completed for past trips', () => {
    const pastStart = new Date();
    pastStart.setDate(pastStart.getDate() - 10);
    const pastEnd = new Date();
    pastEnd.setDate(pastEnd.getDate() - 3);
    expect(getTripStatus(pastStart, pastEnd)).toBe('completed');
  });

  it('returns planning for far future trips (>30 days)', () => {
    const futureStart = new Date();
    futureStart.setDate(futureStart.getDate() + 60);
    const futureEnd = new Date();
    futureEnd.setDate(futureEnd.getDate() + 67);
    expect(getTripStatus(futureStart, futureEnd)).toBe('planning');
  });
});

describe('percentage', () => {
  it('calculates correct percentage', () => {
    expect(percentage(3, 10)).toBe(30);
  });

  it('handles zero total safely without division by zero', () => {
    expect(percentage(5, 0)).toBe(0);
  });
});
