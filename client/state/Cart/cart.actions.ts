import { CartItemInterface } from '../../interfaces';
import { ActionTypes } from './cart.action-types';

export type CartAction = GetCartItems | AddCartItem | RemoveCartItem;

export interface AddCartItem {
  type: ActionTypes.ADD_CART_ITEM;
  payload: CartItemInterface;
}

export interface GetCartItems {
  type: ActionTypes.GET_CART_ITEMS;
  payload: CartItemInterface[];
}

export interface RemoveCartItem {
  type: ActionTypes.REMOVE_CART_ITEM;
}
