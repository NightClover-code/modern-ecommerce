'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import type { Product } from '@apps/shared/types';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  if (!product) return null;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-1 lg:items-start lg:gap-x-8">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                  index === currentImageIndex ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className="mt-3">
            <p className="text-3xl tracking-tight">${product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base">{product.description}</div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">Status:</div>
              <div
                className={
                  product.countInStock > 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            {product.countInStock > 0 && (
              <div>
                <div className="font-medium mb-2">Quantity:</div>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: Math.min(5, product.countInStock) },
                      (_, i) => i + 1,
                    ).map(qty => (
                      <SelectItem key={qty} value={qty.toString()}>
                        {qty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              disabled={product.countInStock === 0}
            >
              {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
              {product.reviews.length === 0 && (
                <p className="text-muted-foreground">No reviews yet</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-6">
            <div className="w-full">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              <Button variant="outline" className="w-full">
                Sign in to Write a Review
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
