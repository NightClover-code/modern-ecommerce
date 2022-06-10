import { NextPage } from 'next';
import ProductsList from '../../../components/ProductsList';
import SEO from '../../../components/SEO';
import { seoConfig } from '../../../utils';

const AdminProductsPage: NextPage = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <ProductsList />
      </main>
    </>
  );
};
export default AdminProductsPage;
