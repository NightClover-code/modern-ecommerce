//importing types & utils
import { seoConfig } from '../utils';
import { productsAPI } from '../lib';
import { GetStaticProps, NextPage } from 'next';
//importing components
import SEO from '../components/SEO';
import Products from '../components/Products';
import { ProductInterface } from '../interfaces';

interface HomeProps {
  products: ProductInterface[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <Products products={products} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await productsAPI('/products');

  return {
    props: {
      products: data,
    },
  };
};

export default Home;
