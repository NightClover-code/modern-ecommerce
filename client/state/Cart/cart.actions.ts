import { CartItemInterface } from '../../interfaces';
import { ActionTypes } from './cart.action-types';

export type CartAction =
  | GetCartItemsStart
  | GetCartItemsSuccess
  | GetCartItemsError
  | AddCartItem
  | RemoveCartItem;

export interface AddCartItem {
  type: ActionTypes.ADD_CART_ITEM;
  payload: CartItemInterface;
}

export interface GetCartItemsStart {
  type: ActionTypes.FETCH_CART_ITEMS_START;
}

export interface GetCartItemsSuccess {
  type: ActionTypes.FETCH_CART_ITEMS_SUCCESS;
  payload: CartItemInterface[];
}

export interface GetCartItemsError {
  type: ActionTypes.FETCH_CART_ITEMS_ERROR;
  payload: string;
}

export interface RemoveCartItem {
  type: ActionTypes.REMOVE_CART_ITEM;
}
