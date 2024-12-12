import { Container } from '@/components/ui/container';
import { CreateProductForm } from '@/modules/admin/components/create-product-form';
import { Card } from '@/components/ui/card';

export default function CreateProductPage() {
  return (
    <Container>
      <div className="py-10">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-6">Create Product</h1>
          <CreateProductForm />
        </Card>
      </div>
    </Container>
  );
}
