import { ActionTypes } from './products.action-types';
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
    case ActionTypes.FETCH_PRODUCTS_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.FETCH_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productReducer = (
  state: ProductState = productInitialState,
  action: ProductsAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCT_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRODUCT_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case ActionTypes.FETCH_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
