import { combineReducers } from 'redux';
import productsReducer from './Products/products.reducer';

export const reducers = combineReducers({
  products: productsReducer,
});

export type RootState = ReturnType<typeof reducers>;
