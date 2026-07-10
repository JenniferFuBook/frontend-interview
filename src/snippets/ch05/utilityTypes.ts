export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
}

export type UserPreview = Pick<User, 'id' | 'name'>; // { id, name }
export type UserUpdate  = Partial<Omit<User, 'id'>>; // All fields except id, all optional.
export type UserRecord  = Record<string, User>;      // { [key: string]: User }
