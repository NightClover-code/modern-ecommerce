import { CSSProperties } from 'react';
import { Spinner } from 'react-bootstrap';

interface LoaderProps {
  options?: CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({ options }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        ...options,
      }}
    >
      <span className="sr-only">Loading</span>
    </Spinner>
  );
};

export default Loader;
