import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@apps/shared/types/cart';
import { useCart } from '../context/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4 md:flex-col md:items-start">
      <div className="relative h-24 w-24 md:h-32 md:w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md md:object-contain"
        />
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 md:w-full md:flex-col">
        <div className="space-y-1">
          <Link
            href={`/products/${item.productId}`}
            className="font-medium hover:underline"
          >
            {item.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formatPrice(item.price)}
          </p>
        </div>
        <div className="flex items-center gap-4 md:w-full md:justify-between">
          <Select
            value={item.qty.toString()}
            onValueChange={value =>
              updateQuantity(item.productId, Number(value))
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[...Array(item.countInStock)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {formatPrice(item.price * item.qty)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.productId)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
