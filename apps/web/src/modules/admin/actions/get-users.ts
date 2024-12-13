import { fetchWithAuth } from '@/lib/fetch-with-auth';

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetchWithAuth('/users');

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
