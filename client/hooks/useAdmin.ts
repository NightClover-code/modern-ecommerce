import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTypedSelector } from '.';
import { useAuth } from './useAuth';

export const useAdmin = () => {
  const { data } = useTypedSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (data && !data?.isAdmin) {
      router.push('/');
    }
  }, [router, data]);

  return data;
};
