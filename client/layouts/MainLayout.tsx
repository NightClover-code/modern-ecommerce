import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCartActions, useLocalStorage, useUserActions } from '../hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MainLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const accessToken = useLocalStorage('', 'accessToken');

  const { getCurrentUser, cleanErrors } = useUserActions();
  const { getCart } = useCartActions();

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (accessToken.length > 0) {
      getCurrentUser(accessToken);
    }
  }, [accessToken, getCurrentUser]);

  useEffect(() => {
    if (router.asPath !== '/login' && router.asPath !== '/register') {
      cleanErrors();
    }
  }, [router, cleanErrors]);

  return (
    <div className="app__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
