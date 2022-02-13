export const cartInitialState = {
  loading: false,
  error: null,
  data: {
    cartItems: [],
    shippingDetails: {
      address: '',
      country: '',
      postalCode: '',
      city: '',
    },
    paymentMethod: 'PayPal',
    taxPrice: 0,
    totalPrice: 0,
    shippingPrice: 0,
    itemsPrice: 0,
  },
};
