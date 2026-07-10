const API = 'https://jsonplaceholder.typicode.com';

async function search(id, signal) {
  const res = await fetch(`${API}/posts/${id}`, { signal });
  return res.json();
}

const controller = new AbortController();
const pending = search(1, controller.signal);
controller.abort(); // The user typed again — cancel the in-flight request.

try {
  await pending;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled'); // Expected control flow, not a failure.
  } else {
    throw error;
  }
}

// AbortSignal.timeout cancels automatically after the given delay.
const fresh = await search(2, AbortSignal.timeout(5000));
console.log(fresh.id); // 2
