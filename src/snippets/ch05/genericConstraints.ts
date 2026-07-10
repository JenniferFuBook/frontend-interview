export function getUserInfo<T extends { id: number; name: string }>(user: T): string {
  return `${user.id}: ${user.name}`;
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

getProperty({ a: 1, b: 2 }, 'a'); // Compile OK.
// getProperty({ a: 1, b: 2 }, 'c'); // Compile error: 'c' is not in keyof { a, b }.
