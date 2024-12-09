import { Container } from '@/components/ui/container';
import { OrdersList } from '@/modules/admin/components/orders-list';

export default function AdminOrdersPage() {
  return (
    <Container>
      <div className="py-10">
        <OrdersList />
      </div>
    </Container>
  );
}
