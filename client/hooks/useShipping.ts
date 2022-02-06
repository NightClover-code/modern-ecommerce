import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTypedSelector } from '.';

export const useShipping = () => {
  const { shippingDetails } = useTypedSelector(state => state.cart.data);
  const router = useRouter();

  useEffect(() => {
    if (
      shippingDetails.address.length < 1 ||
      shippingDetails.city.length < 1 ||
      shippingDetails.country.length < 1 ||
      shippingDetails.city.length < 1
    ) {
      router.push('/shipping');
    }
  }, [router]);

  return shippingDetails;
};
