import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { SaveShippingDetailsDto } from '../dtos/save-shipping-details.dto';
import { SavePaymentMethodDto } from '../dtos/save-payment-method.dto';
import { UserDocument } from '../../users/schemas/user.schema';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: UserDocument) {
    return this.cartService.getCart(user);
  }

  @Post('items')
  addToCart(
    @Body() { productId, qty }: AddToCartDto,
    @CurrentUser() user: UserDocument,
  ) {
    if (!productId) {
      throw new BadRequestException('Product ID is required');
    }
    return this.cartService.addCartItem(productId, qty, user);
  }

  @Put('items/:productId')
  updateCartItem(
    @Param('productId') productId: string,
    @Body('qty') qty: number,
    @CurrentUser() user: UserDocument,
  ) {
    return this.cartService.updateCartItemQty(productId, qty, user);
  }

  @Delete('items/:productId')
  removeFromCart(
    @Param('productId') productId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.cartService.removeCartItem(productId, user);
  }

  @Post('shipping')
  saveShipping(
    @Body() shippingDetails: SaveShippingDetailsDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.cartService.validateShippingDetails(shippingDetails);
  }

  @Post('payment')
  savePaymentMethod(
    @Body() { paymentMethod }: SavePaymentMethodDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.cartService.validatePaymentMethod(paymentMethod);
  }

  @Delete()
  clearCart(@CurrentUser() user: UserDocument) {
    return this.cartService.clearCart(user);
  }
}
