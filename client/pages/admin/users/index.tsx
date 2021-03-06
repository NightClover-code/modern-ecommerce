import { NextPage } from 'next';
import SEO from '../../../components/SEO';
import UsersList from '../../../components/UsersList';
import { seoConfig } from '../../../utils';

const AdminUsersPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <UsersList />
      </main>
    </>
  );
};
export default AdminUsersPage;
