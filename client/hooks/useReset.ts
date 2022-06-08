import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserActions } from './useActions';

export const useReset = () => {
  const router = useRouter();
  const { fetchUsersReset, updateUserReset, userReset } = useUserActions();

  useEffect(() => {
    if (router.asPath !== '/admin/users') {
      fetchUsersReset();
    }

    if (router.asPath !== '/profile') {
      updateUserReset();
    }

    if (router.asPath !== '/register' || '/login') {
      userReset();
    }

    if (!router.asPath.includes('/admin/users/edit')) {
      userReset();
    }
  }, [router, fetchUsersReset, updateUserReset, userReset]);
};
