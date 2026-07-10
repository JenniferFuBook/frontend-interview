export async function fetchUserData(userId) {
  try {
    const [user, posts] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/posts?user=${userId}`).then(r => r.json()),
    ]);
    return { user, posts };
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
