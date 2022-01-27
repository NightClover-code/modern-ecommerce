import { Injectable } from '@nestjs/common';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { Cart } from '../schemas/cart.schema';

@Injectable()
export class CartService {
  cart = new Cart().cart;

  addCartItem(product: ProductDocument, qty: number) {
    const { name, image, price, _id, countInStock } = product;

    const cartItem = {
      productId: _id,
      name,
      image,
      price,
      countInStock,
      qty,
    };

    const itemExists = this.cart.cartItems.find(
      x => x.productId === product._id
    );

    if (itemExists) {
      this.cart.cartItems = this.cart.cartItems.map(x =>
        x.productId === itemExists.productId ? cartItem : x
      );

      return cartItem;
    } else {
      this.cart.cartItems.push(cartItem);

      return cartItem;
    }
  }

  findAllItems() {
    return this.cart.cartItems;
  }
}
