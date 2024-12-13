import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth-api';

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getProfile,
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
