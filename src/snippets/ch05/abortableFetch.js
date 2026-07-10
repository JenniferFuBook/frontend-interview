const API = 'https://jsonplaceholder.typicode.com';

let controller = null;

async function search(id) {
  controller?.abort(); // A new query cancels the one still in flight.
  controller = new AbortController();
  try {
    const res = await fetch(`${API}/posts/${id}`, { signal: controller.signal });
    const post = await res.json();
    console.log(`Result for query ${id}: ${post.title.slice(0, 24)}`);
  } catch (error) {
    if (error.name === 'AbortError') {
      // Control flow, not a failure — in production this branch simply returns.
      console.log(`Query ${id} cancelled — a newer query took over.`);
    } else {
      throw error;
    }
  }
}

// Debounce collapses rapid calls into one — it narrows the race window
// but cannot close it.
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce(search, 200);

// Three keystrokes 100 ms apart — debounce lets only query 3 fire.
debouncedSearch(1);
setTimeout(() => debouncedSearch(2), 100);
setTimeout(() => debouncedSearch(3), 200);

// Two more keystrokes 10 ms apart — query 4 is aborted mid-flight; query 5 wins.
setTimeout(() => search(4), 2000);
setTimeout(() => search(5), 2010);
