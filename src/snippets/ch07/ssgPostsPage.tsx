// Illustrative Next.js App Router snippet (listing 7.4). Not wired into the
// Vite companion app — shown for reference only.
export default async function PostsPage() {
  const posts = await fetchPosts(); // Cache at build time by default — SSG behavior.
  return <Posts posts={posts} />;
}
