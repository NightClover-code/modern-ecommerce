'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Order } from '@apps/shared/types/order';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

interface AdminOrderDetailsProps {
  order: Order;
}

export function AdminOrderDetails({ order }: AdminOrderDetailsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const markAsDelivered = async () => {
    try {
      await apiClient.put(`/orders/${order._id}/deliver`);
      toast({
        title: 'Success',
        description: 'Order marked as delivered',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark order as delivered',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order #{order._id}</h1>
        <div className="space-x-4">
          <Badge
            variant={order.isPaid ? 'default' : 'destructive'}
            className="text-sm"
          >
            {order.isPaid ? 'Paid' : 'Pending Payment'}
          </Badge>
          {order.isPaid && !order.isDelivered && (
            <Button onClick={markAsDelivered}>Mark as Delivered</Button>
          )}
        </div>
      </div>

      {/* Reuse the existing OrderDetails layout but without PayPal button */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-6">
          {/* Shipping Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Customer: </span>
                {order.user.name} ({order.user.email})
              </p>
              <p>
                <span className="font-medium">Address: </span>
                {order.shippingDetails.address}, {order.shippingDetails.city},{' '}
                {order.shippingDetails.postalCode},{' '}
                {order.shippingDetails.country}
              </p>
              {order.isDelivered ? (
                <Alert variant="default" className="mt-4">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Delivered on{' '}
                    {new Date(order.deliveredAt!).toLocaleDateString()}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive" className="mt-4">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>Not Delivered</AlertDescription>
                </Alert>
              )}
            </div>
          </Card>

          {/* Payment Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Method: </span>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert variant="default" className="mt-4">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Paid on {new Date(order.paidAt!).toLocaleDateString()}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive" className="mt-4">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>Not Paid</AlertDescription>
                </Alert>
              )}
            </div>
          </Card>

          {/* Order Items */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map(item => (
                <div
                  key={item.productId}
                  className="flex items-center space-x-4"
                >
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
                      {item.qty} x ${item.price.toFixed(2)} = $
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Order Summary Card */}
        <div className="col-span-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {order.shippingPrice === 0
                    ? 'Free'
                    : `$${order.shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
