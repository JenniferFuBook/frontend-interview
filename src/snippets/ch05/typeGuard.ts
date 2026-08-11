type User = { id: number; name: string };

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'name' in value && typeof value.name === 'string'
  );
}

const data: unknown = JSON.parse('{ "id": 1, "name": "Ada" }');

if (isUser(data)) {
  console.log(`Narrowed to User: ${data.name}`);
}

const bad: unknown = JSON.parse('{ "id": "oops" }');
console.log(`isUser(bad) === ${isUser(bad)}`);
