import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addToCart(@Body() { product, qty, productId }: any, @Session() session: any) {
    this.cartService.cart = session.cart ? session.cart : { cartItems: [] };

    const cartItem = this.cartService.addCartItem({ qty, product, productId });

    session.cart = this.cartService.cart;

    return cartItem;
  }

  @Get()
  getCartItems(@Session() session: any) {
    return session.cart ? session.cart.cartItems : null;
  }
}
