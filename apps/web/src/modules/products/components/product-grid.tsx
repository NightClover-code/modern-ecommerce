'use client';

import { Product } from '@apps/shared/types';
import { ProductCard } from './product-card';
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

  useEffect(() => {
    if (searchKeyword) {
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
        }
      };

      fetchSearchResults();
    }
  }, [searchKeyword, currentPage]);

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
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {searchKeyword && pages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/search/${searchKeyword}?page=${currentPage - 1}`}
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
                      href={`/search/${searchKeyword}?page=${pageNum}`}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href={`/search/${searchKeyword}?page=${currentPage + 1}`}
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
