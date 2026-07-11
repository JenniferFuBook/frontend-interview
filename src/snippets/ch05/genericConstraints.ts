function getUserInfo<T extends { id: number; name: string }>(user: T): string {
  return `${user.id}: ${user.name}`;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

console.log(getUserInfo({ id: 7, name: 'Ada', role: 'admin' })); // 7: Ada — any subtype satisfies the constraint.
console.log(getProperty({ a: 1, b: 2 }, 'a')); // 1 — 'a' is a key of the object.
// getProperty({ a: 1, b: 2 }, 'c'); // Compile error: 'c' is not in keyof { a, b }.

export {}; // Keep this file a module so its declarations stay local.
