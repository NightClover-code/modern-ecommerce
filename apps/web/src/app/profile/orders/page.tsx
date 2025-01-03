import { Container } from '@/components/ui/container';
import { OrderHistory } from '@/modules/profile/components/order-history';
import { fetchWithAuth } from '@/lib/fetch-with-auth';
import { Order } from '@apps/shared/types/order';

export default async function OrderHistoryPage() {
  const response = await fetchWithAuth('/orders/myorders');
  const orders: Order[] = await response.json();

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10">
        <OrderHistory orders={orders} />
      </div>
    </Container>
  );
}
