import { Dispatch } from 'redux';
import { productsAPI } from '../../lib';
import { ActionType } from './products.action-types';
import { ProductsAction } from './products.actions';

export const fetchProducts =
  () => async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({
        type: ActionType.FETCH_PRODUCTS_START,
      });

      const { data } = await productsAPI('/products');

      dispatch({
        type: ActionType.FETCH_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.FETCH_PRODUCTS_ERROR,
        payload: error.mesage,
      });
    }
  };
