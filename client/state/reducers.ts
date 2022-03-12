import { combineReducers } from 'redux';
import { cartReducer } from './Cart/cart.reducers';
import { orderReducer, ordersReducer } from './Order/order.reducers';
import { productReducer, productsReducer } from './Products/products.reducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './User/user.reducers';

export const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  user: userDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  order: orderReducer,
  userOrders: ordersReducer,
});

export type RootState = ReturnType<typeof reducers>;
