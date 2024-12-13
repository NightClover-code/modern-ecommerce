'use client';

import { useQuery } from '@tanstack/react-query';
import { userQueryConfig } from '@/modules/auth/user-config';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useQuery({
    ...userQueryConfig,
    enabled: true,
  });

  return <>{children}</>;
}
