// A generic curry wraps any fixed-arity function, using fn.length to know how many arguments it expects.
function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...more) => curried(...args, ...more); // Gather arguments across calls until fn has enough.
  };
}

const multiply = curry((a, b, c) => a * b * c);

console.log(multiply(2, 3, 4)); // 24 — all three arguments at once.
console.log(multiply(2)(3)(4)); // 24 — one argument per call.
console.log(multiply(2, 3)(4)); // 24 — grouping is the caller's choice.

const times6 = multiply(2, 3); // Partial application: pre-fill 2 and 3, a factor of 6.
console.log(times6(4)); // 24
console.log(times6(5)); // 30
