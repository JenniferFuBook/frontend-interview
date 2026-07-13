// Illustrative Next.js App Router snippet (listing 7.5). Not wired into the
// Vite companion app — shown for reference only.
export default async function UserPage(context) {
  // Fetch fresh data on every request — opt out of Next.js caching (SSR).
  const user = await fetchUser(context.params.id, { cache: 'no-store' });
  return <UserProfile user={user} />;
}
