import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <ShoppingBag className="w-24 h-24 text-muted-foreground/30" />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Looks like you haven't added anything to your cart yet
        </p>
      </div>

      <Link href="/">
        <Button size="lg">Continue Shopping</Button>
      </Link>
    </div>
  );
}
