// Browser-only: run in a browser console (document does not exist in Node).

function attachHandler() {
  function handler() {
    // Holds no reference to large data — the scope is not retained.
    console.log('clicked');
  }

  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler); // Cleanup function.
}

// Call cleanup() later to remove the listener and allow garbage collection.
const cleanup = attachHandler();
