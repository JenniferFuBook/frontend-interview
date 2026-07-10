function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2); // Creates a function with a = 2.
const triple = multiply(3); // Creates a function with a = 3.

console.log(double(5)); // 10
console.log(triple(5)); // 15
