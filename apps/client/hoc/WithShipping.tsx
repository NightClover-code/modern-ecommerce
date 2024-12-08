import { useShipping } from '../hooks';

export const WithShipping: React.FC = ({ children }) => {
  useShipping();
  return <>{children}</>;
};
