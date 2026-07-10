function attachHandler() {
  const largeData = new Array(1_000_000).fill('*');

  document.addEventListener('click', function handler() {
    // largeData stays in scope — unused but reachable by the closure.
    console.log('clicked');
  });
}

// Leaks memory — largeData cannot be collected while handler is attached.
// document exists only in the browser; the guard lets Node run this file.
if (typeof document !== 'undefined') {
  attachHandler();
}
