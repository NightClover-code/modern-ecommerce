'use client';

import { Product } from '@apps/shared/types';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';
import { useEffect, useState } from 'react';
import { getProducts } from '../actions/get-products';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { getVisiblePages } from '@/lib/utils';

interface ProductGridProps {
  products?: Product[];
  searchKeyword?: string;
  currentPage?: number;
}

export function ProductGrid({
  products: initialProducts,
  searchKeyword,
  currentPage = 1,
}: ProductGridProps) {
  const [products, setProducts] = useState(initialProducts);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchKeyword) {
      setIsLoading(true);
      const fetchSearchResults = async () => {
        try {
          const { items, pages: totalPages } = await getProducts(
            currentPage,
            10,
            searchKeyword,
          );
          setProducts(items);
          setPages(totalPages);
        } catch (error) {
          console.error('Failed to search products:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    } else {
      setProducts(initialProducts);
    }
  }, [searchKeyword, currentPage, initialProducts]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  const visiblePages = getVisiblePages(currentPage, pages);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {pages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    searchKeyword
                      ? `/search/${searchKeyword}?page=${currentPage - 1}`
                      : `/?page=${currentPage - 1}`
                  }
                  isActive={currentPage > 1}
                />
              </PaginationItem>

              {visiblePages.map((pageNum, idx) =>
                pageNum === null ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={
                        searchKeyword
                          ? `/search/${searchKeyword}?page=${pageNum}`
                          : `/?page=${pageNum}`
                      }
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href={
                    searchKeyword
                      ? `/search/${searchKeyword}?page=${currentPage + 1}`
                      : `/?page=${currentPage + 1}`
                  }
                  isActive={currentPage < pages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
