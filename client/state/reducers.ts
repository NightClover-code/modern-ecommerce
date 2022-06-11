import { combineReducers } from 'redux';
import { cartReducer } from './Cart/cart.reducers';
import {
  orderDeliverReducer,
  orderReducer,
  ordersReducer,
  userOrdersReducer,
} from './Order/order.reducers';
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productEditReducer,
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
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  user: userDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userEdit: userEditReducer,
  order: orderReducer,
  orderDeliver: orderDeliverReducer,
  orders: ordersReducer,
  userOrders: userOrdersReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof reducers>;
