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
