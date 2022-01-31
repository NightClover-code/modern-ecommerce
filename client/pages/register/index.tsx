import { NextPage } from 'next';
import Register from '../../components/Register';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <Register />
      </main>
    </>
  );
};
export default LoginPage;
