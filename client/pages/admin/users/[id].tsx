import { NextPage } from 'next';
import SEO from '../../../components/SEO';
import UserEdit from '../../../components/UserEdit';
import { seoConfig } from '../../../utils';

const UserEditPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <UserEdit />
      </main>
    </>
  );
};
export default UserEditPage;
