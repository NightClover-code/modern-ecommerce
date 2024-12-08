import { Alert } from 'react-bootstrap';

const Message: React.FC<{ variant?: string }> = ({
  variant = 'info',
  children,
}) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
