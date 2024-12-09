import { Container } from '@/components/ui/container';
import { ProfileForm } from '@/modules/profile/components/profile-form';
import { OrderHistory } from '@/modules/profile/components/order-history';

export default function ProfilePage() {
  return (
    <Container>
      <div className="max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <ProfileForm />
          </div>
          <div className="col-span-8">
            <OrderHistory />
          </div>
        </div>
      </div>
    </Container>
  );
}
