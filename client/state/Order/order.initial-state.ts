import { OrderState } from './order.state';

const order = {
  orderItems: [],
  shippingDetails: {
    address: '',
    country: '',
    city: '',
    postalCode: '',
  },
  paymentMethod: 'PayPal',
  taxPrice: 0,
  shippingPrice: 0,
  itemsPrice: 0,
  totalPrice: 0,
};

export const orderInitialState: OrderState = {
  loading: false,
  error: null,
  data: order,
};
