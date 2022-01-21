import { ActionType } from './products.action-types';
import { ProductsAction } from './products.actions';
import {
  productInitialState,
  productsInitialState,
} from './products.initial-state';
import { ProductsState, ProductState } from './products.state';

export const productsReducer = (
  state: ProductsState = productsInitialState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCTS_START:
      return { ...state, loading: true };
    case ActionType.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case ActionType.FETCH_PRODUCTS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const productReducer = (
  state: ProductState = productInitialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCT_START:
      return { ...state, loading: true };
    case ActionType.FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case ActionType.FETCH_PRODUCT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
