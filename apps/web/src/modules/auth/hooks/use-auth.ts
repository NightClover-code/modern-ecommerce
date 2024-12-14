'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth-api';
import { toast } from '@/hooks/use-toast';

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      router.push('/');
      toast({
        title: 'Welcome back!',
        description: `Signed in as ${data.user.email}`,
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: error.response?.data?.message || 'Login failed',
      });
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      router.push('/');
      toast({
        title: 'Welcome!',
        description: `Account created successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: error.response?.data?.message || 'Registration failed',
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      toast({
        title: 'Signed out',
        description: 'You have been signed out',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: error.response?.data?.message || 'Logout failed',
      });
    },
  });
}
