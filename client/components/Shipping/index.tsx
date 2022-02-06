import FormContainer from '../FormContainer';
import { Form, Button } from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import { ShippingDetails } from '../../interfaces';
import { useCartActions, useTypedSelector } from '../../hooks';
import CheckoutSteps from '../CheckoutSteps';
import { useRouter } from 'next/router';

const Shipping = () => {
  const router = useRouter();

  const { shippingDetails } = useTypedSelector(state => state.cart.data);
  const { saveShippingAddress } = useCartActions();

  const [shippingAddress, setShippingAddress] =
    useState<ShippingDetails>(shippingDetails);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveShippingAddress(shippingAddress);

    router.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

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
