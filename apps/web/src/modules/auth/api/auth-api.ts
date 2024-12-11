import { apiClient } from '@/lib/api-client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/login',
      credentials,
    );
    return response.data;
  },

  register: async (data: LoginCredentials & { name: string }) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },
};
