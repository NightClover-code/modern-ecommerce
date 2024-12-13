import { Container } from '@/components/ui/container';
import { ProductsList } from '@/modules/admin/components/products-list';
import { getProducts } from '@/modules/admin/actions/get-products';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <Container>
      <div className="py-10">
        <ProductsList products={products} />
      </div>
    </Container>
  );
}
