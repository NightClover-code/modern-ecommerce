import { StarIcon } from 'lucide-react';
import type { Product } from '@apps/shared/types';

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const ratings = {
    5: 28,
    4: 9,
    3: 4,
    2: 1,
    1: 1,
  };

  const totalReviews = Object.values(ratings).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 sm:space-y-4">
      <div className="flex items-center gap-4 sm:gap-3">
        <div className="text-4xl font-bold sm:text-3xl">{product.rating}</div>
        <div className="space-y-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 sm:h-4 sm:w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {product.numReviews} reviews
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(ratings)
          .reverse()
          .map(([rating, count]) => (
            <div key={rating} className="flex items-center gap-4 sm:gap-3">
              <div className="w-12 text-sm">{rating} stars</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{
                    width: `${(count / totalReviews) * 100}%`,
                  }}
                />
              </div>
              <div className="w-12 text-sm text-right">{count}</div>
            </div>
          ))}
      </div>

      <div className="space-y-6 sm:space-y-4">
        {product.reviews.map((review, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-medium">{review.name}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 sm:h-3 sm:w-3 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}