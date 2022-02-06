//importing components
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocalStorage, useUserActions } from '../hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

//main layout
const MainLayout: React.FC = ({ children }) => {
  const router = useRouter();

  const { getCurrentUser, cleanErrors } = useUserActions();
  // const {getCurrentCart} = useCzrt
  const accessToken = useLocalStorage('', 'accessToken');

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
