import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { ProductsService } from '../../products/services/products.service';
import { CartItem, ShippingDetails } from '../../interfaces';
import { UserDocument } from '../../users/schemas/user.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productsService: ProductsService,
  ) {}

  async getCart(user: UserDocument): Promise<CartDocument> {
    let cart = await this.cartModel.findOne({ userId: user._id });

    if (!cart) {
      cart = await this.cartModel.create({
        userId: user._id,
        items: [],
      });
    }

    return cart;
  }

  private calculatePrices(cart: CartDocument) {
    cart.itemsPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    );
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
    cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;
    return cart;
  }

  async addCartItem(
    productId: string,
    qty: number,
    user: UserDocument,
  ): Promise<CartDocument> {
    const product = await this.productsService.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const cart = await this.getCart(user);
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.qty = qty;
    } else {
      const cartItem: CartItem = {
        productId: product._id.toString(),
        name: product.name,
        image: product.images[0],
        price: product.price,
        countInStock: product.countInStock,
        qty,
      };
      cart.items.push(cartItem);
    }

    this.calculatePrices(cart);
    return cart.save();
  }

  async removeCartItem(
    productId: string,
    user: UserDocument,
  ): Promise<CartDocument> {
    const cart = await this.getCart(user);
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId,
    );
    this.calculatePrices(cart);
    return cart.save();
  }

  async updateCartItemQty(
    productId: string,
    qty: number,
    user: UserDocument,
  ): Promise<CartDocument> {
    const cart = await this.getCart(user);
    const item = cart.items.find(
      item => item.productId.toString() === productId,
    );

    if (!item) throw new NotFoundException('Item not found in cart');
    if (qty > item.countInStock)
      throw new BadRequestException('Not enough stock');

    item.qty = qty;
    this.calculatePrices(cart);
    return cart.save();
  }

  async clearCart(user: UserDocument): Promise<CartDocument> {
    const cart = await this.getCart(user);
    cart.items = [];
    this.calculatePrices(cart);
    return cart.save();
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
