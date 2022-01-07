//importing types & utils
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { seoConfig } from '../../utils';
//importing components
import Link from 'next/link';
import ProductDetails from '../../components/ProductDetails';
import SEO from '../../components/SEO';
import { productsAPI } from '../../lib';

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
  const { data } = await productsAPI.get(`/products/${params?.id}`);

  return {
    props: {
      product: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await productsAPI.get('/products');

  const paths = products.data.map((p: any) => ({
    params: { id: p._id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Product;
