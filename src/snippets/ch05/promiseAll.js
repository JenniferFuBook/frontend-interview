const API = 'https://jsonplaceholder.typicode.com';

export async function fetchUserData(userId) {
  try {
    // Fire both requests concurrently — Promise.all awaits both.
    const [user, posts] = await Promise.all([
      fetch(`${API}/users/${userId}`).then(r => r.json()),
      fetch(`${API}/posts?userId=${userId}`).then(r => r.json()),
    ]);
    return { user, posts };
  } catch (error) {
    // Rejects fast: one failure rejects the whole Promise.all.
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Top-level await — valid in ES modules and the browser console.
const { user, posts } = await fetchUserData(1);
console.log(user.name); // 'Leanne Graham'
console.log(posts.length); // 10
