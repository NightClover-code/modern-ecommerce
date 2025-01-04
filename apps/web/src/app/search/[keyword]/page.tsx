import { Container } from '@/components/ui/container';
import { ProductGrid } from '@/modules/products/components/product-grid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface SearchPageProps {
  params: {
    keyword: string;
  };
  searchParams: {
    page?: string;
  };
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  return (
    <Container>
      <div className="py-10 space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">
            Search Results: {decodeURIComponent(params.keyword)}
          </h1>
        </div>
        <ProductGrid searchKeyword={params.keyword} currentPage={currentPage} />
      </div>
    </Container>
  );
}
