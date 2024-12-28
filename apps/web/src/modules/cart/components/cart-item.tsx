import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@apps/shared/types/cart';
import { useCart } from '../context/cart-context';
import Image from 'next/image';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <div className="relative h-24 w-24">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1 space-y-1">
        <Link
          href={`/products/${item.productId}`}
          className="font-medium hover:underline"
        >
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          ${item.price.toFixed(2)}
        </p>
        <div className="flex items-center space-x-2">
          <select
            value={item.qty}
            onChange={e =>
              updateQuantity(item.productId, Number(e.target.value))
            }
            className="h-9 w-20 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
          >
            {[...Array(item.countInStock)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.productId)}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="font-medium">${(item.price * item.qty).toFixed(2)}</div>
    </div>
  );
}
