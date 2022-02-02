import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTypedSelector } from '.';

export const useAuth = () => {
  const { data, loading } = useTypedSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!data && !loading) {
      // router.push('/login');
    }
  }, []);

  return data;
};
