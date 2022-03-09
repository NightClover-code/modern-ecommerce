import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartItem, ShippingDetails } from 'src/interfaces';
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

  addCartItem({ qty, productId, product }: AddCartItem): CartItem {
    if (!productId && !product)
      throw new BadRequestException('No id or product provided.');

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

  saveShippingDetails(shippingDetails: ShippingDetails): ShippingDetails {
    this.cart.shippingDetails = shippingDetails;

    return this.cart.shippingDetails;
  }

  savePaymentMethod(paymentMethod: string): string {
    this.cart.paymentMethod = paymentMethod;

    return this.cart.paymentMethod;
  }

  removeCartItem(id: string): CartItem[] {
    const itemExists = this.cart.cartItems.find(x => x.productId === id);

    if (!itemExists) throw new NotFoundException('No cart item found.');

    return this.cart.cartItems.filter(x => x.productId !== id);
  }

  findAllItems(): CartItem[] {
    return this.cart.cartItems;
  }
}
