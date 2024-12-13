import { authApi } from '@/modules/auth/api/auth-api';

export const userQueryConfig = {
  queryKey: ['user'],
  queryFn: authApi.getProfile,
  retry: false,
  staleTime: 1000 * 60 * 5,
} as const;
