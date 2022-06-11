//importing types & utils
import { seoConfig } from '../../../../utils';
import { NextPage } from 'next';
//importing components
import SEO from '../../../../components/SEO';
import { useRouter } from 'next/router';
import ProductsList from '../../../../components/ProductsList';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { pageId } = router.query;

  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <ProductsList pageId={pageId} />
      </main>
    </>
  );
};

export default HomePage;
