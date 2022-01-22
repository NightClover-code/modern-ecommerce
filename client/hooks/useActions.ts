import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { CartActionCreators, ProductsActionCreators } from '../state';

export const useProductsActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(ProductsActionCreators, dispatch);
  }, [dispatch]);
};

export const useCartActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(CartActionCreators, dispatch);
  }, [dispatch]);
};
