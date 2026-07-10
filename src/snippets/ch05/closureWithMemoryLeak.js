// Browser-only: run in a browser console (document does not exist in Node).

function attachHandler() {
  const largeData = new Array(1_000_000).fill('*');

  function logSize() { // Forces largeData into the scope's shared closure context — never called.
    console.log(largeData.length);
  }

  document.addEventListener('click', function handler() {
    console.log('clicked'); // References nothing from the outer scope — yet keeps the whole context alive.
  });
}

// Leaks about 4 MB per call in Chrome — largeData cannot be collected while handler is attached.
attachHandler();
