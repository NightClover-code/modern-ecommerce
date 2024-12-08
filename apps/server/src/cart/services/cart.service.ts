import { BadRequestException, Injectable } from '@nestjs/common';
import { CartItem, ShippingDetails } from 'src/interfaces';
import { ProductDocument } from 'src/products/schemas/product.schema';

interface AddCartItem {
  qty: number;
  productId?: string;
  product?: ProductDocument;
}

@Injectable()
export class CartService {
  addCartItem({ qty, productId, product }: AddCartItem): CartItem {
    if (!productId && !product) {
      throw new BadRequestException('No id or product provided.');
    }

    if (product) {
      const { name, image, price, _id, countInStock } = product;
      return {
        productId: _id.toString(),
        name,
        image,
        price,
        countInStock,
        qty,
      };
    }

    throw new BadRequestException('Product data required');
  }

  validateShippingDetails(shippingDetails: ShippingDetails): ShippingDetails {
    const { address, city, postalCode, country } = shippingDetails;
    if (!address || !city || !postalCode || !country) {
      throw new BadRequestException('All shipping fields are required');
    }
    return shippingDetails;
  }

  validatePaymentMethod(paymentMethod: string): string {
    const validMethods = ['PayPal', 'Stripe'];
    if (!validMethods.includes(paymentMethod)) {
      throw new BadRequestException('Invalid payment method');
    }
    return paymentMethod;
  }
}
