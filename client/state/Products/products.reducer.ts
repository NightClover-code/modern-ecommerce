import { ProductInterface } from '../../interfaces';
import { ActionType } from './products.action-types';
import { ProductsAction } from './products.actions';

export interface ProductsState {
  loading: boolean;
  error: string | null;
  products: ProductInterface[];
}

const initialState: ProductsState = {
  loading: false,
  error: null,
  products: [],
};

const productsReducer = (
  state: ProductsState = initialState,
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

export default productsReducer;
