'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface BrandAssetsProps {
  brandLogo?: {
    url: string;
  };
}

export function BrandAssets({ brandLogo }: BrandAssetsProps) {
  if (!brandLogo) {
    return (
      <Card className="w-full p-4">
        <div className="h-32 animate-pulse bg-muted rounded-md" />
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="p-4 space-y-4">
        <div className="aspect-video relative">
          <Image
            src={brandLogo.url}
            alt="Brand logo"
            fill
            className="object-contain"
          />
        </div>
      </Card>
    </motion.div>
  );
}
