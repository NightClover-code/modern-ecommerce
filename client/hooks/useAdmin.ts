import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTypedSelector } from '.';

export const useAdmin = () => {
  const { data } = useTypedSelector(state => state.user);
  const { loading } = useTypedSelector(state => state.users);
  const router = useRouter();

  useEffect(() => {
    if ((data && !data?.isAdmin) || !data) {
      router.push('/');
    }
  }, [router, data, loading]);

  return data;
};
