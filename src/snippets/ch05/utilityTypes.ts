interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
}

type UserPreview = Pick<User, 'id' | 'name'>; // { id, name }
type UserUpdate  = Partial<Omit<User, 'id'>>; // All fields except id, all optional.
type UserRecord  = Record<string, User>;      // { [key: string]: User }

const preview: UserPreview = { id: 1, name: 'Ada' };
console.log(preview); // { id: 1, name: 'Ada' }

const update: UserUpdate = { role: 'viewer' };
console.log(update); // { role: 'viewer' } — any subset of the editable fields.

const record: UserRecord = {
  ada: { id: 1, name: 'Ada', email: 'ada@example.com', role: 'admin' },
};
console.log(Object.keys(record)); // [ 'ada' ]

// const wide: UserUpdate = { id: 2 }; // Compile error: 'id' does not exist in type UserUpdate.

export {}; // Keep this file a module so its declarations stay local.
