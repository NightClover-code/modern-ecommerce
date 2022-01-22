//importing hooks, types & utils
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { seoConfig } from '../../utils';
//importing components
import Link from 'next/link';
import ProductDetails from '../../components/ProductDetails';
import SEO from '../../components/SEO';

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-4">
        <Link href="/" passHref>
          <div className="btn btn-light my-3">Go Back</div>
        </Link>
        <ProductDetails pageId={id} router={router} />
      </main>
    </>
  );
};

export default ProductPage;
