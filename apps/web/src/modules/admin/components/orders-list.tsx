'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Order } from '@apps/shared/types/order';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

interface OrdersListProps {
  orders: Order[];
}

export function OrdersList({ orders }: OrdersListProps) {
  const { toast } = useToast();
  const router = useRouter();

  const markAsDelivered = async (orderId: string) => {
    try {
      await apiClient.put(`/orders/${orderId}/deliver`);
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
    <Card>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>USER</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>TOTAL</TableHead>
            <TableHead>PAID</TableHead>
            <TableHead>DELIVERED</TableHead>
            <TableHead className="text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">#{order._id}</TableCell>
              <TableCell>{order.user}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                {order.isPaid ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {new Date(order.paidAt!).toLocaleDateString()}
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="mr-1 h-3 w-3" />
                    Not Paid
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {order.isDelivered ? (
                  <Badge variant="default">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {new Date(order.deliveredAt!).toLocaleDateString()}
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <XCircle className="mr-1 h-3 w-3" />
                    Not Delivered
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/orders/${order._id}`}>View</Link>
                </Button>
                {order.isPaid && !order.isDelivered && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => markAsDelivered(order._id)}
                  >
                    Mark Delivered
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
