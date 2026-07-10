console.log('start');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('end');

// Output:
// start
// end
// Promise      ← microtask queue drains before next macrotask
// setTimeout   ← macrotask
