'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

export function OrderReview() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 space-y-6">
        {/* Shipping Address */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping</h2>
          <p className="text-muted-foreground">
            <strong>Address: </strong>
            123 Example St, New York, NY 10001, United States
          </p>
        </Card>

        {/* Payment Method */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <p className="text-muted-foreground">
            <strong>Method: </strong>
            PayPal
          </p>
        </Card>

        {/* Order Items */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {[1, 2].map(item => (
              <div key={item} className="flex items-center space-x-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/images/airpods.jpg"
                    alt="Product"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href="/products/1"
                    className="font-medium hover:underline"
                  >
                    Airpods Wireless
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    2 x $199.00 = $398.00
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
              <span>$398.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$39.80</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>$437.80</span>
            </div>
            <Button className="w-full" size="lg">
              Place Order
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
