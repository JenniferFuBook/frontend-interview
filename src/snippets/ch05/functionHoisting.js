// Function declarations hoist with their body; function expressions do not.
greet(); // OK — the declaration is hoisted with its body.
// sayHello(); // ReferenceError — `sayHello` is in the temporal dead zone.

function greet() {
  console.log('hi');
}

const sayHello = function () {
  console.log('hello');
};
sayHello();
