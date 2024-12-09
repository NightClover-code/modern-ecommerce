import { Container } from '@/components/ui/container';
import { UsersList } from '@/modules/admin/components/users-list';

export default function AdminUsersPage() {
  return (
    <Container>
      <div className="py-10">
        <UsersList />
      </div>
    </Container>
  );
}
