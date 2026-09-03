// Illustrative Next.js App Router snippet (listing 7.6). Not wired into the
// Vite companion app — shown for reference only.
export default async function UserPage(context) {
  // Fetch fresh data on every request (SSR); uncached is the App Router default, and no-store states it explicitly.
  const user = await fetchUser(context.params.id, { cache: 'no-store' });
  return <UserProfile user={user} />;
}
