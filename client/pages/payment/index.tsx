import { NextPage } from 'next';
import Payment from '../../components/Payment';
import SEO from '../../components/SEO';
import { WithAuth, WithShipping } from '../../hoc';
import { seoConfig } from '../../utils';

const PaymentPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <WithAuth>
          <WithShipping>
            <Payment />
          </WithShipping>
        </WithAuth>
      </main>
    </>
  );
};
export default PaymentPage;
