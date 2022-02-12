import { CartInterface } from '../interfaces';

export const cartWithPrices = (cart: CartInterface) => {
  const itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.qty,
      0
    )
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(parseFloat((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(itemsPrice + shippingPrice + taxPrice);

  return {
    ...cart,
    shippingPrice,
    taxPrice,
    itemsPrice,
    totalPrice,
  };
};

export const addDecimals = (n: number) => {
  return parseFloat((Math.round(n * 100) / 100).toFixed(2));
};

export * from './config';
