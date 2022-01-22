import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Cart from '../../components/Cart';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils';

const CartForProductPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-4">
        <Cart router={router} />
      </main>
    </>
  );
};

export default CartForProductPage;
