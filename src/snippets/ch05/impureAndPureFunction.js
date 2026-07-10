let total = 0;

// Impure: mutates external state.
function addToTotal(n) {
  total += n;
  return total;
}

// Pure: depends only on its arguments.
function add(a, b) {
  return a + b;
}

console.log(addToTotal(5)); // 5
console.log(addToTotal(5)); // 10 — same argument, different result.

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 — same arguments, same result, every time.
