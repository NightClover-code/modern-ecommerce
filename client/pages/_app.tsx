//importing styles
import '../styles/index.css';
import '../styles/bootstrap.min.css';
//importing utils
import { useStore } from '../state';
import type { AppContext, AppProps } from 'next/app';
//importing components
import MainLayout from '../layouts/MainLayout';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const initialState = {
    ...pageProps.initialReduxState,
  };

  const store = useStore(initialState);

  return (
    <Provider store={store}>
      <MainLayout>
        <Container>
          <Component {...pageProps} />
        </Container>
      </MainLayout>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
