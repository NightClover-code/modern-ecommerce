import { combineReducers } from 'redux';
import { cartReducer } from './Cart/cart.reducers';
import { productReducer, productsReducer } from './Products/products.reducers';

export const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof reducers>;
