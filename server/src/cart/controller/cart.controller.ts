import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addToCart(@Body() { product, qty }: any, @Session() session: any) {
    this.cartService.cart = session.cart ? session.cart : { cartItems: [] };

    const cartItem = this.cartService.addCartItem(product, qty);

    session.cart = this.cartService.cart;

    console.log(session);

    return cartItem;
  }

  @Get()
  getCartItems(@Session() session: any) {
    console.log(session);

    return session.cart ? session.cart.cartItems : null;
  }
}
