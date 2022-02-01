import { NextPage } from 'next';
import Profile from '../../components/Profile';
import SEO from '../../components/SEO';
import WithAuth from '../../hoc/WithAuth';
import { seoConfig } from '../../utils';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <WithAuth>
          <Profile />
        </WithAuth>
      </main>
    </>
  );
};
export default LoginPage;
