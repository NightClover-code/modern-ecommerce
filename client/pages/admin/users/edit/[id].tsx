import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SEO from '../../../../components/SEO';
import UserEdit from '../../../../components/UserEdit';
import { seoConfig } from '../../../../utils';

const AdminUserEditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <UserEdit pageId={id} />
      </main>
    </>
  );
};
export default AdminUserEditPage;
