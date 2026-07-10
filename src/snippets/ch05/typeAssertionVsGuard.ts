export function processAs(value: unknown): string {
  return (value as string).toUpperCase(); // Assertion: trusts the caller — crashes at runtime if wrong.
}

export function processSafe(value: unknown): string {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected string, got ${typeof value}`);
  }
  return value.toUpperCase(); // Guard: verified at runtime before use.
}
