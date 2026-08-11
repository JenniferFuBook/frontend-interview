function processAs(value: unknown): string {
  return (value as string).toUpperCase(); // Assertion: trusts the caller, crashes at runtime if wrong.
}

function processSafe(value: unknown): string {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected string, got ${typeof value}`); // Guard: verify before use.
  }
  return value.toUpperCase();
}

console.log(processAs('hello'));

try {
  processAs(123);
} catch (err) {
  console.log(err instanceof Error ? err.message : String(err));
}

try {
  processSafe(123);
} catch (err) {
  console.log(err instanceof Error ? err.message : String(err));
}
