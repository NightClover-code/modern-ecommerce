import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserActions } from './useActions';

export const useReset = () => {
  const router = useRouter();
  const { fetchUsersReset, updateUserReset } = useUserActions();

  useEffect(() => {
    if (router.asPath !== '/admin/users') {
      fetchUsersReset();
    }

    if (router.asPath !== '/profile') {
      updateUserReset();
    }
  }, [router, fetchUsersReset, updateUserReset]);
};
