'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';
import type { PaginatedResponse, User } from '@apps/shared/types';

export async function getUsers(
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResponse<User>> {
  try {
    const response = await fetchWithAuth(`/users?page=${page}&limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data: PaginatedResponse<User> = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      items: [],
      total: 0,
      page: 1,
      pages: 1,
    };
  }
}
