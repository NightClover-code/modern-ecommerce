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
    keyFeatures: string[];
  };
}

export function ProductInfo({ productInfo }: ProductInfoProps) {
  if (!productInfo) {
    return <Card className="w-full h-32 animate-pulse" />;
  }

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

        {productInfo.keyFeatures && (
          <div>
            <p className="font-medium mb-2">Key Features:</p>
            <ul className="list-disc list-inside space-y-1">
              {productInfo.keyFeatures.map((feature, index) => (
                <li key={index} className="text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
