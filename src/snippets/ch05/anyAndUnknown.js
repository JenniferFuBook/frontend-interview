"use strict";
function fetchResponse() {
    return 'text from the API'; // Stands in for an external source — the shape is unknown.
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromApi = fetchResponse();
const safeValue = fetchResponse();
if (typeof safeValue === 'string') {
    console.log(`Narrowed to string: ${safeValue.toUpperCase()}`); // Compiles — typeof narrowed it.
}
console.log('unknown: safeValue.method() does not even compile.');
console.log('any: fromApi.method() compiles without complaint — and crashes at runtime.');
console.log('Uncomment the last lines to see each failure.');
// safeValue.method(); // Compile error: 'safeValue' is of type 'unknown'.
// fromApi.method(); // Runtime crash: fromApi.method is not a function.
