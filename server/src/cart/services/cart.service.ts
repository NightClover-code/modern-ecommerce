import { Injectable } from '@nestjs/common';
import { ProductDocument } from 'src/products/schemas/product.schema';

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

@Injectable()
export class CartService {
  cartItems: CartItem[] = [];

  create(product: ProductDocument, qty: number) {
    const { name, image, price, _id, countInStock } = product;

    const cartItem = {
      productId: _id,
      name,
      image,
      price,
      countInStock,
      qty,
    };

    const itemExists = this.cartItems.find(x => x.productId === product._id);

    console.log(itemExists);

    if (itemExists) {
      this.cartItems = this.cartItems.map(x =>
        x.productId === itemExists.productId ? cartItem : x
      );

      return cartItem;
    } else {
      this.cartItems.push(cartItem);

      return cartItem;
    }
  }

  findMany() {
    return this.cartItems;
  }
}
