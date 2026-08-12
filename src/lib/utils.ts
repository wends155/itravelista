import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, differenceInDays, isPast, isToday, isFuture } from 'date-fns';

/** Merge Tailwind CSS classes safely with clsx and tailwind-merge */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format numeric amount as Philippine Peso (PHP ₱) */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format date for UI display */
export function formatDate(date: Date | string, pattern: string = 'MMM d, yyyy'): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, pattern);
}

/** Calculate days remaining from today until a target date */
export function daysUntil(targetDate: Date | string): number {
  if (!targetDate) return 0;
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return differenceInDays(target, today);
}

/** Determine trip status based on start and end dates */
export function getTripStatus(
  startDate: Date | string,
  endDate: Date | string
): 'planning' | 'upcoming' | 'in_progress' | 'completed' {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const now = new Date();

  if (isPast(end) && !isToday(end)) return 'completed';
  if (isToday(start) || (isPast(start) && isFuture(end))) return 'in_progress';
  if (differenceInDays(start, now) <= 30 && isFuture(start)) return 'upcoming';
  return 'planning';
}

/** Calculate percentage safely */
export function percentage(part: number, total: number): number {
  if (!total || total === 0) return 0;
  return Math.round((part / total) * 100);
}
