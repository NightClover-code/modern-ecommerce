import { CartItem, ShippingDetails } from 'src/interfaces';

export interface CartInterface {
  cartItems: CartItem[];
  shippingDetails: ShippingDetails;
}

export const defaultCart = {
  cartItems: [],
  shippingDetails: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
};

export class Cart {
  constructor(public cart: CartInterface = defaultCart) {}
}
