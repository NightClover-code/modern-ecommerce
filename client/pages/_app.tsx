import '../styles/index.css';
import '../styles/bootstrap.min.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import { Container } from 'react-bootstrap';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Container>
        <Component {...pageProps} />
      </Container>
    </MainLayout>
  );
}

export default MyApp;
