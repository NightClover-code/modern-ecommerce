import { Injectable } from '@nestjs/common';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { Cart } from '../schemas/cart.schema';

interface AddCartItem {
  qty: number;
  productId?: string;
  product?: ProductDocument;
}

@Injectable()
export class CartService {
  cart = new Cart().cart;

  addCartItem({ qty, productId, product }: AddCartItem) {
    if (product) {
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
    } else {
      const cartItem = this.cart.cartItems.find(x => x.productId === productId);

      cartItem.qty = qty;

      return cartItem;
    }
  }

  findAllItems() {
    return this.cart.cartItems;
  }
}
