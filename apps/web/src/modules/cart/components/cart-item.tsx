import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartItem() {
  return (
    <div className="flex items-start space-x-6 p-6 bg-card rounded-lg border">
      <div className="relative h-24 w-24">
        <Image
          src="/images/airpods.jpg"
          alt="Product image"
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1 space-y-1">
        <Link href="/products/1" className="font-medium hover:underline">
          Airpods Wireless Bluetooth Headphones
        </Link>
        <div className="text-lg font-medium">$199.00</div>
      </div>

      <div className="flex items-center space-x-4">
        <Select defaultValue="1">
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map(qty => (
              <SelectItem key={qty} value={qty.toString()}>
                {qty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
