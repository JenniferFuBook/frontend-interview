// Illustrative Next.js App Router snippet (listing 7.6). Not wired into the
// Vite companion app — shown for reference only.
export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Route params are async in the App Router (Next.js 15+).
  // Fetch fresh data on every request (SSR); uncached is the App Router default, and no-store states it explicitly.
  const user = await fetchUser(id, { cache: 'no-store' });
  return <UserProfile user={user} />;
}
