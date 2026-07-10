function attachHandler() {
  function handler() {
    // Holds no reference to large data — the scope is not retained.
    console.log('clicked');
  }

  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler); // Cleanup function.
}

// Call cleanup() later to remove the listener and allow garbage collection.
// document exists only in the browser; the guard lets Node run this file.
if (typeof document !== 'undefined') {
  const cleanup = attachHandler();
  console.log(typeof cleanup); // 'function'
}
