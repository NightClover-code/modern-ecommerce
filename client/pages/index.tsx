import SEO from '../components/SEO';
import { Container } from 'react-bootstrap';
import { seoConfig } from '../utils';

const Home = () => {
  return (
    <>
      <SEO {...seoConfig} />
      <main className="wrapper py-3">
        <Container>
          <h1>Welcome to proshop</h1>
        </Container>
      </main>
    </>
  );
};

export default Home;
