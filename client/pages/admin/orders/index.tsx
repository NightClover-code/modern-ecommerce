import { NextPage } from 'next';
import OrdersList from '../../../components/OrdersList';
import SEO from '../../../components/SEO';
import { seoConfig } from '../../../utils';

const OrderPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <OrdersList />
      </main>
    </>
  );
};
export default OrderPage;
