import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  useCartActions,
  useLocalStorage,
  useTypedSelector,
  useUserActions,
} from '../hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MainLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const accessToken = useLocalStorage('', 'accessToken');

  const { getCurrentUser, cleanErrors } = useUserActions();
  const { data } = useTypedSelector(state => state.user);
  const { getCart } = useCartActions();

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (accessToken.length > 0 && !data) {
      getCurrentUser(accessToken);
    }
  }, [accessToken, getCurrentUser, data]);

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
