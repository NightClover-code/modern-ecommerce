import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useProductsActions, useUserActions } from './useActions';

export const useReset = () => {
  const router = useRouter();
  const { fetchUsersReset, updateUserReset, userReset } = useUserActions();
  const { fetchProductReset } = useProductsActions();

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

    if (!router.asPath.includes('/product/')) {
      fetchProductReset();
    }
  }, [router, fetchUsersReset, updateUserReset, userReset, fetchProductReset]);
};
