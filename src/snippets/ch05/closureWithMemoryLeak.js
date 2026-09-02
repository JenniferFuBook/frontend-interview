// Browser-only: run in a browser console (document does not exist in Node).

function attachHandler() {
  const largeData = new Array(1_000_000).fill('*');

  document.addEventListener('click', function handler() {
    console.log(largeData.length); // Reference largeData directly — handler closes over the array.
  });
}

// Leaks about 4 MB per call in Chrome — while handler stays attached, largeData cannot be collected.
attachHandler();
