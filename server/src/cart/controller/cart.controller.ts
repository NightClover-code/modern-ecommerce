import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addToCart(@Body() { product, qty }: any) {
    const cartItem = this.cartService.addCartItem(product, qty);

    return cartItem;
  }

  @Get()
  getCartItems() {
    const cartItems = this.cartService.findAllItems();

    return cartItems;
  }
}
