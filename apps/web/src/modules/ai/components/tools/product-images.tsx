'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProductImagesProps {
  images?: {
    url: string;
  }[];
}

export function ProductImages({ images }: ProductImagesProps) {
  if (!images) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="aspect-square animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <Card
            key={index}
            className={cn(
              'overflow-hidden',
              index === 0 && images.length === 1 && 'col-span-2',
            )}
          >
            <div className="aspect-square relative">
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
