//importing types & utils
import { homeConfig } from '../../utils';
import { NextPage } from 'next';
//importing components
import SEO from '../../components/SEO';
import Products from '../../components/Products';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { pageId } = router.query;

  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <Products pageId={pageId} />
      </main>
    </>
  );
};

export default HomePage;
