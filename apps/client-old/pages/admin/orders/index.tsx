import { NextPage } from 'next';
import OrdersList from '../../../components/OrdersList';
import SEO from '../../../components/SEO';
import { homeConfig } from '../../../utils';

const OrderPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <OrdersList />
      </main>
    </>
  );
};
export default OrderPage;
