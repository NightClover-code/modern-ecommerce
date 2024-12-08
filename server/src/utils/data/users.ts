import { hashPassword } from '../password';

export const users = async () => [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: await hashPassword('123456'),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: await hashPassword('123456'),
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: await hashPassword('123456'),
    isAdmin: false,
  },
];
