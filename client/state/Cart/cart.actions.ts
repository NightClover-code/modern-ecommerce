import { CartItemInterface } from '../../interfaces';
import { ActionTypes } from './cart.action-types';

export type CartAction =
  | CartAddItemStart
  | CartAddItemSuccess
  | CartAddItemError
  | GetCartItemsStart
  | GetCartItemsSucess
  | GetCartItemsError;

export interface CartAddItemStart {
  type: ActionTypes.ADD_CART_ITEM_START;
}

export interface CartAddItemSuccess {
  type: ActionTypes.ADD_CART_ITEM_SUCCESS;
  payload: CartItemInterface;
}

export interface CartAddItemError {
  type: ActionTypes.ADD_CART_ITEM_ERROR;
  payload: string;
}

export interface GetCartItemsStart {
  type: ActionTypes.FETCH_CART_ITEMS_START;
}

export interface GetCartItemsSucess {
  type: ActionTypes.FETCH_CART_ITEMS_SUCCESS;
}

export interface GetCartItemsError {
  type: ActionTypes.FETCH_CART_ITEMS_ERROR;
}

export interface CartRemoveItemStart {
  type: ActionTypes.REMOVE_CART_ITEM_START;
}
