//importing types & utils
import { seoConfig } from '../utils';
import { NextPage } from 'next';
//importing components
import SEO from '../components/SEO';
import Products from '../components/Products';

const Home: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <Products />
      </main>
    </>
  );
};

export default Home;
