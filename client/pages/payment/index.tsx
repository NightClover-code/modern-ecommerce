import { NextPage } from 'next';
import Payment from '../../components/Payment';
import SEO from '../../components/SEO';
import { seoConfig } from '../../utils';

const PaymentPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <Payment />
      </main>
    </>
  );
};
export default PaymentPage;
