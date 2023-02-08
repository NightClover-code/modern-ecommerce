import { NextPage } from 'next';
import SEO from '../../../components/SEO';
import UsersList from '../../../components/UsersList';
import { homeConfig } from '../../../utils';

const AdminUsersPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <UsersList />
      </main>
    </>
  );
};
export default AdminUsersPage;
