'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface BrandAssetsProps {
  brandLogo?: string;
  brandColors?: {
    primary: string;
    secondary: string;
  };
}

export function BrandAssets({ brandLogo, brandColors }: BrandAssetsProps) {
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
            src={brandLogo}
            alt="Brand logo"
            fill
            className="object-contain"
          />
        </div>

        {brandColors && (
          <div className="flex gap-4">
            <div className="flex-1">
              <div
                className="h-8 rounded-md mb-2"
                style={{ backgroundColor: brandColors.primary }}
              />
              <p className="text-xs text-muted-foreground">
                Primary: {brandColors.primary}
              </p>
            </div>
            <div className="flex-1">
              <div
                className="h-8 rounded-md mb-2"
                style={{ backgroundColor: brandColors.secondary }}
              />
              <p className="text-xs text-muted-foreground">
                Secondary: {brandColors.secondary}
              </p>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
