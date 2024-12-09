import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductDetailsProps {
  productId: string;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-1">
        {/* Product Image */}
        <div className="aspect-square relative max-w-2xl">
          <Image
            src="/images/airpods.webp"
            alt="Product image"
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Airpods Wireless Bluetooth Headphones
            </h1>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">42 reviews</span>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold">$199.00</h2>
            <p className="mt-4 text-muted-foreground">
              Bluetooth technology lets you connect it with compatible devices
              wirelessly. High-quality AAC audio offers immersive listening
              experience.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">Status:</div>
              <div className="text-green-600">In Stock</div>
            </div>

            <div>
              <div className="font-medium mb-2">Quantity:</div>
              <Select defaultValue="1">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(qty => (
                    <SelectItem key={qty} value={qty.toString()}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-6">
              {/* Sample Review */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">John Doe</span>
                  <div className="flex">
                    {[1, 2, 3, 4].map(star => (
                      <span key={star} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  March 15, 2024
                </div>
                <p>Great product, exactly what I was looking for!</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-6">
            <div className="w-full">
              <h3 className="font-semibold mb-4">Write a Review</h3>
              {/* Add review form will go here */}
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
