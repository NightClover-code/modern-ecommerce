import { NextPage } from 'next';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils';

const OrderPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">HEYY</main>
    </>
  );
};
export default OrderPage;
