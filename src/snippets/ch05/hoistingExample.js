'use strict';

function greet() {
  console.log(messageVar); // Log undefined — `var` is hoisted and initialized.
  console.log(messageLet); // Throw ReferenceError — `let` is in the TDZ.
  var messageVar = 'hello';
  let messageLet = 'hello';
}

greet();
