import { Container } from '@/components/ui/container';
import { OrderDetails } from '@/modules/orders/components/order-details';

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10">
        <OrderDetails orderId={params.id} />
      </div>
    </Container>
  );
}
