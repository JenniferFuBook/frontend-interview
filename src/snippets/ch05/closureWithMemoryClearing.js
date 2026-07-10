// Browser-only: run in a browser console (document does not exist in Node).

function attachHandler() {
  const largeData = new Array(1_000_000).fill('*');

  function logSize(data) { // Takes the data as a parameter — captures nothing from the scope.
    console.log(data.length);
  }
  logSize(largeData);

  function handler() {
    console.log('clicked'); // References nothing from the outer scope.
  }

  document.addEventListener('click', handler);

  return () => document.removeEventListener('click', handler); // Cleanup function.
}

// largeData is collected when attachHandler returns; call cleanup() to remove the listener.
const cleanup = attachHandler();
