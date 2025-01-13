'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import type { Product } from '@apps/shared/types';
import { ProductReviews } from './product-reviews';
import { StarIcon } from 'lucide-react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/modules/cart/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ReviewForm } from './review-form';
import { useRouter } from 'next/navigation';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!product) return null;

  const isOutOfStock = product.countInStock === 0;

  const handleAddToCart = async () => {
    setLoading(true);
    toast({
      title: 'Adding to cart...',
      description: 'Please wait while we add your item.',
    });

    try {
      await addItem(product._id, quantity);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 md:px-2 lg:px-1">
      <div className="grid grid-cols-2 gap-x-12 sm:gap-x-8 md:gap-x-6 md:grid-cols-1 lg:gap-y-6">
        {/* Left Column - Images */}
        <div className="space-y-6 sm:space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="relative h-full w-full"
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-4 sm:gap-2 sm:overflow-x-auto sm:pb-2">
            {product.images.map((image, index) => (
              <motion.button
                key={image}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 sm:w-16 aspect-square rounded-md overflow-hidden border-[1px] transition-all sm:flex-shrink-0
                  ${index === currentImageIndex ? ' border-black' : 'border-transparent'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6 sm:space-y-4">
          <div className="flex items-center justify-between text-sm lg:flex-col lg:gap-2 lg:items-start">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={product.brandLogo}
                  alt={product.brand}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-base">{product.brand}</span>
            </div>
            <span className="text-muted-foreground">Ref: {product._id}</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-[1px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                {product.numReviews} reviews
              </span>
            </div>
          </div>

          <div className="text-4xl font-bold">${product.price}</div>

          <Separator />

          <div className="space-y-4">
            {isOutOfStock ? (
              <div className="text-red-500 font-medium">Out of Stock</div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-green-600 font-medium">In Stock</div>
                </div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <Select
                  value={quantity.toString()}
                  onValueChange={value => setQuantity(Number(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: product.countInStock },
                      (_, i) => i + 1,
                    ).map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            className="w-full h-12 text-lg [&_svg]:size-5"
            disabled={isOutOfStock || loading}
            onClick={handleAddToCart}
          >
            <HiOutlineShoppingBag className="mr-2" size={30} />
            {isOutOfStock
              ? 'Out of Stock'
              : loading
                ? 'Adding...'
                : 'Add to Cart'}
          </Button>

          <div className="mt-12 sm:mt-8">
            <Tabs defaultValue="details" className="space-y-6 sm:space-y-4">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">
                  Details
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews ({product.numReviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p>{product.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-8">
                  <ReviewForm
                    productId={product._id}
                    onSuccess={() => {
                      // Refresh product data to show new review
                      router.refresh();
                    }}
                  />
                  <ProductReviews product={product} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
