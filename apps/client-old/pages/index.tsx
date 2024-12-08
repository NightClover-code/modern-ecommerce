//importing types & utils
import { homeConfig } from '../utils';
import { NextPage } from 'next';
//importing components
import SEO from '../components/SEO';
import Products from '../components/Products';

const HomePage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <Products />
      </main>
    </>
  );
};

export default HomePage;
