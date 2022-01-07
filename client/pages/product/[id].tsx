//importing types & utils
import products from '../../utils/products';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { seoConfig } from '../../utils';
//importing components
import Link from 'next/link';
import ProductDetails from '../../components/ProductDetails';
import SEO from '../../components/SEO';

const Product: NextPage<{ product: any }> = ({ product }) => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-4">
        <Link href="/" passHref>
          <div className="btn btn-light my-3">Go Back</div>
        </Link>
        <ProductDetails {...product} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find(p => p._id === params?.id);

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map(p => ({
    params: { id: p._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Product;
