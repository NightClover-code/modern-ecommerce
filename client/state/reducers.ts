import { combineReducers } from 'redux';
import { cartReducer } from './Cart/cart.reducers';
import { productReducer, productsReducer } from './Products/products.reducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './User/user.reducers';

export const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
});

export type RootState = ReturnType<typeof reducers>;
