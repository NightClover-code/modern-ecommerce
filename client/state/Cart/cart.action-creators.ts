import { Dispatch } from 'redux';
import { RootState } from '..';
import { productsAPI } from '../../lib';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';

export const addToCart =
  (id: string, qty: number) =>
  async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
    const product = getState().product.product;

    // dispatch({
    //   type: ActionTypes.CART_ADD_ITEM,
    //   payload: {
    //     productId: product._id,
    //   },
    // });
  };
