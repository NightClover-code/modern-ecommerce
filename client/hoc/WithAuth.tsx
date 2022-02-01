import { useAuth } from '../hooks';

const WithAuth: React.FC = ({ children }) => {
  useAuth();
  return <>{children}</>;
};

export default WithAuth;
