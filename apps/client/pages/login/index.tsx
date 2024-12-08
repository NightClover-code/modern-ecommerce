import { NextPage } from 'next';
import Login from '../../components/Login';
import SEO from '../../components/SEO';
import { homeConfig } from '../../utils';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <Login />
      </main>
    </>
  );
};
export default LoginPage;
