//importing hooks, types & utils
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { homeConfig } from '../../utils';
//importing components
import ProductDetails from '../../components/ProductDetails';
import SEO from '../../components/SEO';

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-4">
        <ProductDetails pageId={id} />
      </main>
    </>
  );
};

export default ProductPage;
