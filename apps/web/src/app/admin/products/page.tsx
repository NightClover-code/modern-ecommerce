import { Container } from '@/components/ui/container';
import { ProductsList } from '@/modules/admin/components/products-list';
import { getProducts } from '@/modules/admin/actions/get-products';
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
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AdminProductsPageProps {
  searchParams: { page?: string };
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const { page } = searchParams;
  const currentPage = Number(page) || 1;
  const { items: products, pages } = await getProducts(currentPage, 8);

  const visiblePages = getVisiblePages(currentPage, pages);

  return (
    <Container>
      <div className="py-10 space-y-6">
        <ProductsList products={products} />
        <div className="flex justify-center">
          {pages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/admin/products?page=${currentPage - 1}`}
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
                        href={`/admin/products?page=${pageNum}`}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href={`/admin/products?page=${currentPage + 1}`}
                    isActive={currentPage < pages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </Container>
  );
}
