import FormContainer from '../FormContainer';
import { Form, Button } from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import { ShippingDetails } from '../../interfaces';
import { useAuth, useCartActions, useTypedSelector } from '../../hooks';
import CheckoutSteps from '../CheckoutSteps';
import { useRouter } from 'next/router';
import Message from '../Message';

const Shipping = () => {
  useAuth();

  const router = useRouter();

  const {
    data: { shippingDetails },
    error,
  } = useTypedSelector(state => state.cart);
  const { saveShippingAddress } = useCartActions();

  const [shippingAddress, setShippingAddress] =
    useState<ShippingDetails>(shippingDetails);
  const [message, setMessage] = useState<string | null | string[]>(error);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { address, country, city, postalCode } = shippingAddress;

    if (
      address.length < 1 ||
      country.length < 1 ||
      city.length < 1 ||
      postalCode.length < 1
    ) {
      setMessage('All fields are required.');

      return null;
    }

    saveShippingAddress(shippingAddress);

    router.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      {message && (
        <Message variant="danger">
          {Array.isArray(message) ? message[0] : message}
        </Message>
      )}

      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={shippingAddress.address}
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="py-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={shippingAddress.city}
            onChange={e =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={shippingAddress.postalCode}
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                postalCode: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="py-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={shippingAddress.country}
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
