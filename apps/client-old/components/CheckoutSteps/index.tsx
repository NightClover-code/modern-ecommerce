import { Nav } from 'react-bootstrap';
import Link from 'next/link';

const CheckoutSteps = ({ step1, step2, step3, step4 }: any) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Link href="/login" passHref>
            <Nav.Link>Sign In</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Link href="/shipping" passHref>
            <Nav.Link>Shipping</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Link href="/payment" passHref>
            <Nav.Link>Payment</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Link href="/placeorder" passHref>
            <Nav.Link>Place Order</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
