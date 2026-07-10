function makeCounter() {
  let count = 0; // Lives in makeCounter's scope.
  return function increment() {
    count++; // Resolves via the scope chain to makeCounter's scope.
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
