import { Container } from '@/components/ui/container';
import { CreateProductForm } from '@/modules/admin/components/create-product-form';
import { Card } from '@/components/ui/card';
import { ChatInterface } from '@/modules/chat/components/chat-interface';
// import { ProductPreview } from '@/modules/admin/components/product-prev   iew';

export default function CreateProductPage() {
  return (
    <Container>
      <div className="py-10">
        <Card className="p-6">
          <h1 className="text-3xl font-bold mb-6">Create Product</h1>
          <div className="grid grid-cols-2 gap-6">
            <ChatInterface
              mode="product-creation"
              // onProductUpdate={product => {
              //   // Handle product updates
              // }}
            />
            {/* <ProductPreview /> */}
          </div>
        </Card>
      </div>
    </Container>
  );
}
