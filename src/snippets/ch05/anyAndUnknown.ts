function fetchResponse(): unknown {
  return 'text from the API'; // Stands in for an external source — the shape is unknown.
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromApi: any = fetchResponse();
const safeValue: unknown = fetchResponse();

if (typeof safeValue === 'string') {
  console.log(`Narrowed to string: ${safeValue.toUpperCase()}`); // Compiles — typeof narrowed it.
}

console.log('unknown: safeValue.method() does not even compile.');
// safeValue.method(); // Compile error: 'safeValue' is of type 'unknown'.

console.log('any: fromApi.method() compiles without complaint — and crashes at runtime.');
// fromApi.method(); // Runtime crash: fromApi.method is not a function.
