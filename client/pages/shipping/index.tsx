import { NextPage } from 'next';
import SEO from '../../components/SEO';
import Shipping from '../../components/Shipping';
import { WithAuth } from '../../hoc';
import { seoConfig } from '../../utils';

const ShippingPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <WithAuth>
          <Shipping />
        </WithAuth>
      </main>
    </>
  );
};
export default ShippingPage;
