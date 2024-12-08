import { useAuth } from '../hooks';

export const WithAuth: React.FC = ({ children }) => {
  useAuth();
  return <>{children}</>;
};
