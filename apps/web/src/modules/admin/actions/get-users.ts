import { fetchWithAuth } from '@/lib/fetch-with-auth';
import type { User } from '@apps/shared/types';

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetchWithAuth('/users');

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data: User[] = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
