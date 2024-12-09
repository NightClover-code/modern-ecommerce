import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem } from './cart-item';
import { CartEmpty } from './cart-empty';

export function CartPage() {
  const items = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 2,
    },
  ]; // Sample empty cart

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="space-y-8 pb-10 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">3 items</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <div className="space-y-4">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </div>

        <div className="col-span-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$597.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$59.70</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>$656.70</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
