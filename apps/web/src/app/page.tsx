import { Container } from '@/components/ui/container';
import { ProductGrid } from '@/modules/products/components/product-grid';
import { getProducts } from '@/modules/products/actions/get-products';

export default async function Home() {
  const products = await getProducts();

  return (
    <Container className="mt-10">
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Latest Products</h1>
          <ProductGrid products={products} />
        </div>
      </div>
    </Container>
  );
}
