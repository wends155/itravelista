import { describe, it, expect } from 'vitest';
import { ok, err, isOk, ERROR_CODES } from '@/lib/errors';

describe('Result helpers', () => {
  it('ok() creates a success Result object', () => {
    const result = ok({ tripId: '123' });
    expect(result.data).toEqual({ tripId: '123' });
    expect(result.error).toBeNull();
  });

  it('err() creates an error Result object', () => {
    const result = err(ERROR_CODES.TRIP_NOT_FOUND, 'Trip not found');
    expect(result.data).toBeNull();
    expect(result.error?.code).toBe('TRIP_NOT_FOUND');
    expect(result.error?.message).toBe('Trip not found');
  });

  it('isOk() type guards success results correctly', () => {
    const successResult = ok('data');
    if (isOk(successResult)) {
      expect(successResult.data).toBe('data');
    }

    const errorResult = err('CODE', 'message');
    expect(isOk(errorResult)).toBe(false);
  });
});
