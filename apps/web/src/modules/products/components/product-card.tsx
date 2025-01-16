import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Product } from '@apps/shared/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <Card className="h-full overflow-hidden transition-colors hover:bg-accent">
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        </div>
        <div className="p-4 border-t border-border">
          <h3 className="font-medium">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold">${product.price}</p>
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.numReviews})
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
