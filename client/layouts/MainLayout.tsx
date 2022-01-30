//importing components
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocalStorage, useUserActions } from '../hooks';
import { useEffect } from 'react';

//main layout
const MainLayout: React.FC = ({ children }) => {
  const { getCurrentUser } = useUserActions();
  const accessToken = useLocalStorage('', 'accessToken');

  useEffect(() => {
    if (accessToken.length > 0) {
      getCurrentUser(accessToken);
    }
  }, [accessToken, getCurrentUser]);

  return (
    <div className="app__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
