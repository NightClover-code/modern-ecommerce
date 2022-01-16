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
      return { loading: true, products: [], error: null };
    case ActionType.FETCH_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload, error: null };
    case ActionType.FETCH_PRODUCTS_ERROR:
      return { loading: false, products: [], error: action.payload };
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
      return { loading: true, product: null, error: null };
    case ActionType.FETCH_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, error: null };
    case ActionType.FETCH_PRODUCT_ERROR:
      return { loading: false, product: null, error: action.payload };
    default:
      return state;
  }
};
