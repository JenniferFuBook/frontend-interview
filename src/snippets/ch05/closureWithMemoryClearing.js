// Browser-only: run in a browser console (document does not exist in Node).

function attachHandler() {
  const largeData = new Array(1_000_000).fill('*');
  console.log(largeData.length); // Used inline — no inner function references largeData,
  // so it is never context-allocated and is collected when attachHandler returns.

  function handler() {
    console.log('clicked'); // References nothing from the outer scope.
  }

  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler); // Cleanup function.
}

// Call cleanup() later to remove the listener.
const cleanup = attachHandler();
