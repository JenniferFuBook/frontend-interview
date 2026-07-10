interface Config {
  url: string;
}
interface Config {
  retries: number; // Declaration merging — Config now has url and retries.
}

export const config: Config = { url: 'https://api.example.com', retries: 3 };

export type Status = 'idle' | 'loading' | 'success'; // A union is necessarily a type.

const state = { status: 'success' } as const; // Narrows status to the literal 'success'.
export const current: Status = state.status; // Assignable — the literal is in the union.

export const routes = {
  home: '/',
  posts: '/posts',
} satisfies Record<string, `/${string}`>; // Validates without widening…

export const postsPath: '/posts' = routes.posts; // …so each value keeps its literal type.
