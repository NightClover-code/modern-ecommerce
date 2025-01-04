'use client';

import { useCart } from '../context/cart-context';
import { CartEmpty } from './cart-empty';
import { CartItem } from './cart-item';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';

export function CartPage() {
  const { items, loading } = useCart();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <CartEmpty />;
  }

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = Number((0.15 * subtotal).toFixed(2));
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-8 pb-10 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold md:text-2xl">Shopping Cart</h1>
        <p className="text-muted-foreground">{items.length} items</p>
      </div>

      <div className="grid grid-cols-12 gap-8 lg:gap-6 md:grid-cols-1">
        <div className="col-span-8 md:col-span-1">
          <div className="space-y-4">
            {items.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
        </div>

        <div className="col-span-4 md:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => router.push('/checkout/shipping')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
