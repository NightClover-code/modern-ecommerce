import React from 'react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container>
      <div className="py-10 space-y-6">
        <Card>
          <div className="flex items-center justify-between p-6">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
