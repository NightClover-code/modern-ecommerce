import { ProductDetails } from '@/modules/products/components/product-details';
import { Container } from '@/components/ui/container';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <Container>
      <ProductDetails productId={id} />
    </Container>
  );
}
