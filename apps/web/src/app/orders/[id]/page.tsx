import { OrderDetails } from '@/modules/orders/components/order-details';
import { Container } from '@/components/ui/container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchWithAuth } from '@/lib/fetch-with-auth';
import { Order } from '@apps/shared/types/order';

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const response = await fetchWithAuth(`/orders/${id}`);

  const order: Order = await response.json();

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10">
        <OrderDetails order={order} />
      </div>
    </Container>
  );
}
