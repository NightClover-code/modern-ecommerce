import { refreshToken } from '@/modules/auth/api/refresh-token';
import { apiClient } from './api-client';
import { useQueryClient } from '@tanstack/react-query';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const queryClient = useQueryClient();

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshToken();
        if (!response) {
          throw new Error('Refresh failed');
        }
        processQueue(null, 'refreshed');
        return apiClient(originalRequest);
      } catch (error) {
        processQueue(error, null);
        // Clear user data on refresh failure
        queryClient.setQueryData(['user'], null);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
