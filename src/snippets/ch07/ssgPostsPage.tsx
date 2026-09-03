// Illustrative Next.js App Router snippet (listing 7.5). Not wired into the
// Vite companion app — shown for reference only.
export default async function PostsPage() {
  const posts = await fetchPosts({ cache: 'force-cache' }); // Opt in to caching for static (SSG) rendering; the App Router no longer caches fetch by default.
  return <Posts posts={posts} />;
}
