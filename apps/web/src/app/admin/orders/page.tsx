import { Container } from '@/components/ui/container';
import { fetchWithAuth } from '@/lib/fetch-with-auth';
import { OrdersList } from '@/modules/admin/components/orders-list';
import { Order } from '@apps/shared/types/order';

export default async function AdminOrdersPage() {
  const orders = await fetchWithAuth('/orders');
  const ordersData: Order[] = await orders.json();

  return (
    <Container>
      <div className="py-10">
        <OrdersList orders={ordersData} />
      </div>
    </Container>
  );
}
