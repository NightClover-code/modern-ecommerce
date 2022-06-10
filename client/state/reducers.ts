import { combineReducers } from 'redux';
import { cartReducer } from './Cart/cart.reducers';
import { orderReducer, ordersReducer } from './Order/order.reducers';
import {
  productDeleteReducer,
  productReducer,
  productsReducer,
} from './Products/products.reducers';
import {
  userDetailsReducer,
  userEditReducer,
  userLoginReducer,
  userRegisterReducer,
  usersReducer,
  userUpdateReducer,
} from './User/user.reducers';

export const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  user: userDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userEdit: userEditReducer,
  order: orderReducer,
  userOrders: ordersReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof reducers>;
