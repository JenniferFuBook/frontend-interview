import { logger } from './logger';

// Listing 7.10: two observable behaviors — a return value and a side effect
// (the logger call) — tested independently in formatDate.test.ts (listing 7.11).
export function formatDate(date: Date): string {
  const formatted = date.toISOString().split('T')[0];
  logger.log(`Formatted date: ${formatted}`);
  return formatted;
}
