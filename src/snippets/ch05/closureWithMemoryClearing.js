// Browser-only: run in a browser console (document does not exist in Node).

function attachHandler() {
  const largeData = new Array(1_000_000).fill('*');

  function handler() {
    console.log(largeData.length); // The handler needs largeData, so it legitimately closes over it.
  }

  document.addEventListener('click', handler);

  return () => document.removeEventListener('click', handler); // Cleanup function removes the listener.
}

// Remove the listener to make handler unreachable, releasing largeData for collection.
const cleanup = attachHandler();
cleanup();
