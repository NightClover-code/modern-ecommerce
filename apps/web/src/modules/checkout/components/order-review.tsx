'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { useCheckout } from '../context/checkout-context';
import { useCart } from '@/modules/cart/context/cart-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';
import { TAX_RATE } from '@/config/constants';

export function OrderReview() {
  const { shippingAddress: shippingDetails, paymentMethod } = useCheckout();
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((itemsPrice * TAX_RATE).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = async () => {
    try {
      const orderItems = items.map(item => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        productId: item.productId,
      }));

      const response = await apiClient.post('/orders', {
        orderItems,
        shippingDetails,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      await clearCart();
      router.push(`/orders/${response.data._id}`);
    } catch (error) {
      toast({
        title: 'Error placing order',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 space-y-6">
        {/* Shipping Address */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping</h2>
          <p className="text-muted-foreground">
            <strong>Address: </strong>
            {shippingDetails?.address}, {shippingDetails?.city},{' '}
            {shippingDetails?.postalCode}, {shippingDetails?.country}
          </p>
        </Card>

        {/* Payment Method */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <p className="text-muted-foreground">
            <strong>Method: </strong>
            {paymentMethod}
          </p>
        </Card>

        {/* Order Items */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.productId} className="flex items-center space-x-4">
                <div className="relative h-20 w-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.productId}`}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="col-span-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
