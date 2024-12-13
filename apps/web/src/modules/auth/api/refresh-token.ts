import { apiClient } from '@/lib/api-client';

export async function refreshToken() {
  try {
    await apiClient.post('/auth/refresh');
    return true;
  } catch (error) {
    throw error;
  }
}
