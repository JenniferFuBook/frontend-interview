// Loop closure bug: `var` creates a single binding shared by all iterations,
// so every callback logs the final value (3, 3, 3). `let` creates a fresh
// binding per iteration and logs 0, 1, 2.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
