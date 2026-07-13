import { describe, it, expect, vi } from 'vitest';
import { formatDate } from '../utils/formatDate';
import { logger } from '../utils/logger';

vi.mock('../utils/logger'); // Replace the logger module with auto-mocks before any test runs.

describe('formatDate', () => {
  it('formats the date to YYYY-MM-DD', () => {
    // Assert the pure return value — independent of logging behavior.
    const result = formatDate(new Date('2026-06-15'));
    expect(result).toBe('2026-06-15');
  });

  it('logs the formatted date', () => {
    // Assert the side effect — logger.log was called with the correct argument.
    formatDate(new Date('2026-06-15'));
    expect(logger.log).toHaveBeenCalledWith('Formatted date: 2026-06-15');
  });
});
