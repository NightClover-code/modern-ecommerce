//importing utils
import { seoConfig } from '../utils';
//importing components
import SEO from '../components/SEO';
import Products from '../components/Products';

const Home = () => {
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
