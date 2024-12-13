import { authApi } from '@/modules/auth/api/auth-api';

export const userQueryConfig = {
  queryKey: ['user'],
  queryFn: authApi.getProfile,
  retry: (failureCount: number, error: any) => {
    // Don't retry on auth errors
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return false;
    }
    // Retry other errors up to 3 times
    return failureCount < 3;
  },
  staleTime: 1000 * 60 * 5,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
} as const;
