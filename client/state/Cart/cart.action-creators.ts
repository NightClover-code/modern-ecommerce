import { Dispatch } from 'redux';
import { ProductInterface } from '../../interfaces';
import { productsAPI } from '../../lib';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';

interface AddToCart {
  qty: number;
  productId?: string;
  product?: ProductInterface;
}

export const addToCart =
  ({ qty, productId, product }: AddToCart) =>
  async (dispatch: Dispatch<CartAction>) => {
    try {
      dispatch({
        type: ActionTypes.ADD_CART_ITEM_START,
      });

      const { data } = await productsAPI.post(
        '/cart',
        {
          product,
          qty,
          productId,
        },
        { withCredentials: true }
      );

      dispatch({
        type: ActionTypes.ADD_CART_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.ADD_CART_ITEM_ERROR,
        payload: error.message,
      });
    }
  };

export const getCartItems = () => async (dispatch: Dispatch<CartAction>) => {
  try {
    dispatch({
      type: ActionTypes.FETCH_CART_ITEMS_START,
    });

    const { data } = await productsAPI.get('/cart', { withCredentials: true });

    dispatch({
      type: ActionTypes.FETCH_CART_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypes.FETCH_CART_ITEMS_ERROR,
      payload: error.message,
    });
  }
};
