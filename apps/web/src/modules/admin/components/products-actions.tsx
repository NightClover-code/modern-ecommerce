'use client';

import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/modules/products/actions/get-products';

interface ProductsActionsProps {
  product: Product;
}

export function ProductsActions({ product }: ProductsActionsProps) {
  const router = useRouter();

  return (
    <div className="space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/admin/products/${product._id}/edit`)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-500 hover:text-red-600"
        onClick={() => {
          // Delete action will be implemented later
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
