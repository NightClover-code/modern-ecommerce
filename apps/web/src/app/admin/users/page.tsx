import { Container } from '@/components/ui/container';
import { UsersList } from '@/modules/admin/components/users-list';
import { getUsers } from '@/modules/admin/actions/get-users';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <Container>
      <div className="py-10">
        <UsersList users={users} />
      </div>
    </Container>
  );
}
