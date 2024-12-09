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

export function OrderHistory() {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-2xl font-bold">My Orders</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>TOTAL</TableHead>
            <TableHead>PAID</TableHead>
            <TableHead>DELIVERED</TableHead>
            <TableHead className="text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map(order => (
            <TableRow key={order}>
              <TableCell className="font-medium">#6543{order}</TableCell>
              <TableCell>2024-03-15</TableCell>
              <TableCell>$234.56</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  March 15, 2024
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  <XCircle className="mr-1 h-3 w-3" />
                  Not Delivered
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/orders/${order}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
