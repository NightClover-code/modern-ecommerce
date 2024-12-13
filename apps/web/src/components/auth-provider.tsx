'use client';

import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/modules/auth/api/auth-api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useQuery({
    queryKey: ['user'],
    queryFn: authApi.getProfile,
    retry: false,
  });

  return <>{children}</>;
}
