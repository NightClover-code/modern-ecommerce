import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/cart-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CartIcon() {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
