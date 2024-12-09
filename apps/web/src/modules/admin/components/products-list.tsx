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
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ProductsList() {
  return (
    <Card>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>IMAGE</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead className="text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map(product => (
            <TableRow key={product}>
              <TableCell className="font-medium">#1234{product}</TableCell>
              <TableCell>
                <div className="relative h-10 w-10">
                  <Image
                    src="/images/airpods.jpg"
                    alt="Product"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </TableCell>
              <TableCell>Airpods Wireless</TableCell>
              <TableCell>$199.99</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>23</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
