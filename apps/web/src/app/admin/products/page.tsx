import { Container } from '@/components/ui/container';
import { ProductsList } from '@/modules/admin/components/products-list';

export default function AdminProductsPage() {
  return (
    <Container>
      <div className="py-10">
        <ProductsList />
      </div>
    </Container>
  );
}
