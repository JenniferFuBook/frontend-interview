const obj = {
  name: 'Widget',
  greetDelayed: function () {
    setTimeout(function () {
      console.log(this.name); // undefined — a regular function gets its own `this`.
    }, 0);
  },
  greetDelayedFixed: function () {
    setTimeout(() => {
      console.log(this.name); // 'Widget' — an arrow function inherits `this` lexically.
    }, 0);
  },
};
obj.greetDelayed();
obj.greetDelayedFixed();

function greet(greeting) {
  return `${greeting}, ${this.name}`;
}
const user = { name: 'Alice' };
console.log(greet.call(user, 'Hello')); // 'Hello, Alice' — `call` sets `this` for one invocation.
const boundGreet = greet.bind(user);
console.log(boundGreet('Hello')); // 'Hello, Alice' — `bind` returns a permanently bound function.
