// Illustrative React Router 7+ server-side loader (listing 7.3). Not wired into
// the Vite companion app — shown for reference only.
import { redirect, Outlet } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request); // read the session on the server
  if (!user) {
    throw redirect('/login'); // HTTP 302 before any protected HTML is generated
  }
  return { user }; // child routes read this with useLoaderData
}

export default function ProtectedLayout() {
  return <Outlet />; // the guard has already run in the loader
}
