import { ProductInterface } from '../../interfaces';
import { ActionType } from './products.action-types';

export type ProductsAction =
  | FetchProductsStart
  | FetchProductsError
  | FetchProductsSuccess;

export interface FetchProductsStart {
  type: ActionType.FETCH_PRODUCTS_START;
}

export interface FetchProductsSuccess {
  type: ActionType.FETCH_PRODUCTS_SUCCESS;
  payload: ProductInterface[];
}

export interface FetchProductsError {
  type: ActionType.FETCH_PRODUCTS_ERROR;
  payload: string;
}
