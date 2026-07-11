interface Config {
  url: string;
}
interface Config {
  retries: number; // Declaration merging — Config now has url and retries.
}

const config: Config = { url: 'https://api.example.com', retries: 3 };
console.log(`Merged interface: ${config.url} with ${config.retries} retries`);

type Status = 'idle' | 'loading' | 'success'; // A union is necessarily a type.

const state = { status: 'success' } as const; // Narrows status to the literal 'success'.
const current: Status = state.status; // Assignable — the literal is in the union.
console.log(`as const narrowed the literal: ${current}`);

const routes = {
  home: '/',
  posts: '/posts',
} satisfies Record<string, `/${string}`>; // Validates without widening…

const postsPath: '/posts' = routes.posts; // …so each value keeps its literal type.
console.log(`satisfies kept the literal: ${postsPath}`);

export {}; // Keep this file a module so its declarations stay local.
