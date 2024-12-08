import { Body, Controller, Post } from '@nestjs/common';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { SaveShippingDetailsDto } from '../dtos/save-shipping-details.dto';
import { CartService } from '../services/cart.service';
import { SavePaymentMethodDto } from '../dtos/save-payment-method.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addToCart(@Body() body: AddToCartDto) {
    return this.cartService.addCartItem(body);
  }

  @Post('shipping')
  saveShipping(@Body() body: SaveShippingDetailsDto) {
    return this.cartService.validateShippingDetails(body);
  }

  @Post('payment')
  savePaymentMethod(@Body() { paymentMethod }: SavePaymentMethodDto) {
    return this.cartService.validatePaymentMethod(paymentMethod);
  }
}
