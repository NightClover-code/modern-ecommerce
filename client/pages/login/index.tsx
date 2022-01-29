import { NextPage } from 'next';
import Login from '../../components/Login';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <Login />
      </main>
    </>
  );
};
export default LoginPage;
