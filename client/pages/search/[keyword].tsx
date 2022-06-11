//importing types & utils
import { seoConfig } from '../../utils';
import { NextPage } from 'next';
//importing components
import SEO from '../../components/SEO';
import Products from '../../components/Products';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { keyword } = router.query;

  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <Products keyword={keyword} />
      </main>
    </>
  );
};

export default HomePage;
