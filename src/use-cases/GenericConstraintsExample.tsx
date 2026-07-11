function getUserInfo<T extends { id: number; name: string }>(user: T): string {
  return `${user.id}: ${user.name}`;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 7, name: 'Ada', role: 'admin' };
const scores = { a: 1, b: 2 };

const GenericConstraintsExample = () => (
  <ul>
    <li>getUserInfo: {getUserInfo(user)} — any subtype satisfies the constraint</li>
    <li>getProperty: {getProperty(scores, 'a')} — 'a' is a key of the object</li>
    {/* getProperty(scores, 'c') — compile error: 'c' is not in keyof { a, b } */}
  </ul>
);

export default GenericConstraintsExample;
