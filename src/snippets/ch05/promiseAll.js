const API = 'https://jsonplaceholder.typicode.com';

export async function fetchUserData(userId) {
  try {
    const [user, posts] = await Promise.all([
      fetch(`${API}/users/${userId}`).then(r => r.json()),
      fetch(`${API}/posts?userId=${userId}`).then(r => r.json()),
    ]);
    return { user, posts };
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

const { user, posts } = await fetchUserData(1);
console.log(user.name); // 'Leanne Graham'
console.log(posts.length); // 10
