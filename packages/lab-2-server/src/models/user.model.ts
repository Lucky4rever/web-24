type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  username: string;
  password: string;
  role: UserRole;
};
