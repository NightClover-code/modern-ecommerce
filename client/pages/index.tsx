//importing utils
import { seoConfig } from '../utils';
//importing components
import SEO from '../components/SEO';
import { Container } from 'react-bootstrap';
import Products from '../components/Products';

const Home = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-5">
        <Container>
          <Products />
        </Container>
      </main>
    </>
  );
};

export default Home;
