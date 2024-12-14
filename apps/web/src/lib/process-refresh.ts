import { refreshToken } from '@/modules/auth/api/refresh-token';
import { apiClient } from './api-client';
import { queryClient } from '@/app/providers';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

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

// Reset function for cleanup
const resetRefreshState = () => {
  isRefreshing = false;
  failedQueue = [];
};

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // // Skip refresh for auth endpoints
    // const isAuthEndpoint = originalRequest.url?.includes('/auth/');
    // if (isAuthEndpoint) {
    //   return Promise.reject(error);
    // }

    // If we're already retrying or it's not a 401, reject immediately
    if (originalRequest._retry || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Safety check - if we somehow got stuck
    if (isRefreshing) {
      console.warn('Refresh got stuck, resetting state');
      resetRefreshState();
      queryClient.setQueryData(['user'], null);
      queryClient.cancelQueries({ queryKey: ['user'] });
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await refreshToken();
      processQueue(null, 'refreshed');
      return apiClient(originalRequest);
    } catch (error) {
      processQueue(error, null);
      throw error;
    } finally {
      resetRefreshState();
    }
  },
);
