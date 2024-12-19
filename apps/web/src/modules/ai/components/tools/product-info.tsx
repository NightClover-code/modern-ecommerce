'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface ProductInfoProps {
  productInfo?: {
    name: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
  };
}

export function ProductInfo({ productInfo }: ProductInfoProps) {
  if (!productInfo) {
    return <Card className="w-full h-32 animate-pulse" />;
  }

  const isOutOfStock = productInfo.countInStock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{productInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{productInfo.brand}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">${productInfo.price}</p>
            <p className="text-sm text-muted-foreground">
              {productInfo.category}
            </p>
          </div>
        </div>

        <p className="text-sm">{productInfo.description}</p>

        <div>
          {isOutOfStock ? (
            <div className="text-red-500 text-sm font-medium">Out of Stock</div>
          ) : (
            <div className="text-green-600 text-sm font-medium">
              In Stock ({productInfo.countInStock} units)
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
