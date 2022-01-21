import { CartAction } from './cart.actions';
import { cartInitialState } from './cart.initial-state';
import { CartState } from './cart.state';

export const cartReducer = (
  state: CartState = cartInitialState,
  action: CartAction
): CartState => {};
