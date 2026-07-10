declare function fetchResponse(): unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromApi: any = fetchResponse();
fromApi.method(); // Passes — no compile error, but may crash at runtime.

const safeValue: unknown = fetchResponse();
// safeValue.method(); // Compile error: Object is of type 'unknown'.

if (typeof safeValue === 'string') {
  safeValue.toUpperCase(); // Compiles — narrowed to string.
}
