'use server';

import { fetchWithAuth } from '@/lib/fetch-with-auth';
import { revalidatePath } from 'next/cache';

export async function deleteUser(userId: string) {
  try {
    const response = await fetchWithAuth(`/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete user',
    };
  }
}
