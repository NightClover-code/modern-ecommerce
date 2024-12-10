'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth-api';
import { useAuthStore } from '../store/auth-store';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

export function useLogin() {
  const router = useRouter();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      setUser(data.user);
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      toast({
        title: 'Welcome back!',
        description: `Signed in as ${data.user.email}`,
      });
      router.push('/');
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'An error occurred during login';
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: message,
      });
      throw error;
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      toast({
        title: 'Goodbye!',
        description: 'You have been signed out successfully',
      });
      router.push('/login');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
      });
    },
  });
}
