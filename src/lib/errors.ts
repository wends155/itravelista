export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: AppError };

export function ok<T>(data: T): Result<T> {
  return { data, error: null };
}

export function err<T>(code: string, message: string, details?: unknown): Result<T> {
  return { data: null, error: { code, message, details } };
}

/** Type guard for checking if Result is success */
export function isOk<T>(result: Result<T>): result is { data: T; error: null } {
  return result.error === null;
}

export const ERROR_CODES = {
  // Trip errors
  TRIP_NOT_FOUND: 'TRIP_NOT_FOUND',
  TRIP_CREATE_FAILED: 'TRIP_CREATE_FAILED',
  TRIP_UPDATE_FAILED: 'TRIP_UPDATE_FAILED',
  TRIP_DELETE_FAILED: 'TRIP_DELETE_FAILED',

  // Checklist errors
  CHECKLIST_ITEM_NOT_FOUND: 'CHECKLIST_ITEM_NOT_FOUND',
  CHECKLIST_CREATE_FAILED: 'CHECKLIST_CREATE_FAILED',
  TEMPLATE_NOT_FOUND: 'TEMPLATE_NOT_FOUND',

  // Budget errors
  BUDGET_ENTRY_NOT_FOUND: 'BUDGET_ENTRY_NOT_FOUND',
  BUDGET_CREATE_FAILED: 'BUDGET_CREATE_FAILED',
  INVALID_AMOUNT: 'INVALID_AMOUNT',

  // Visa errors
  COUNTRY_NOT_FOUND: 'COUNTRY_NOT_FOUND',
  DATA_UNAVAILABLE: 'DATA_UNAVAILABLE',

  // Auth errors
  AUTH_FAILED: 'AUTH_FAILED',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;
