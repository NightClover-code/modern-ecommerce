'use client';

import { motion } from 'framer-motion';
import ProductExpertChat from '@/modules/ai/components/product-expert-chat';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

export default function ProductAIPage() {
  return (
    <Container>
      <motion.div
        className="container mx-auto p-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Product Development Expert
            </h1>
            <p className="text-muted-foreground">
              Chat with our AI expert to help you develop and validate your
              product ideas. Get instant feedback on product features, branding,
              and market viability.
            </p>
          </Card>

          <ProductExpertChat />
        </div>
      </motion.div>
    </Container>
  );
}
