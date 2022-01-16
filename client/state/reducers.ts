import { combineReducers } from 'redux';
import { productReducer, productsReducer } from './Products/products.reducer';

export const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof reducers>;
