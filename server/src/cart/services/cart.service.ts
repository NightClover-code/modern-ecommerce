import { Injectable } from '@nestjs/common';
import { ProductDocument } from 'src/products/schemas/product.schema';

@Injectable()
export class CartService {
  cartItems: Partial<ProductDocument>[] = [];

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

    const itemExists = this.cartItems.find(x => x._id === product._id);

    if (itemExists) {
      this.cartItems.forEach(x => (x._id === itemExists._id ? cartItem : x));

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
