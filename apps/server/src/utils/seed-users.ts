import { faker } from '@faker-js/faker';
import { hash } from 'argon2';

const ROLES = ['user', 'admin'] as const;

interface GeneratedUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
  createdAt: Date;
  reviews: number;
  purchases: number;
}

export async function generateUsers(count: number): Promise<GeneratedUser[]> {
  const users: GeneratedUser[] = [];
  const hashedPassword = await hash('password123');

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user: GeneratedUser = {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      }),
      password: hashedPassword,
      avatar: faker.image.avatar(),
      isAdmin: i === 0, // First user is admin
      createdAt: faker.date.past({ years: 1 }),
      reviews: faker.number.int({ min: 0, max: 15 }),
      purchases: faker.number.int({ min: 1, max: 20 }),
    };

    users.push(user);
  }

  return users.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
