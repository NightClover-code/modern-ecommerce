import { NextPage } from 'next';
import PlaceOrder from '../../components/PlaceOrder';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils';

const OrderPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <PlaceOrder />
      </main>
    </>
  );
};
export default OrderPage;
