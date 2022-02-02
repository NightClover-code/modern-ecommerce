import FormContainer from '../FormContainer';
import { Form, Button } from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import { ShippingDetails } from '../../interfaces';

const Shipping = () => {
  const initialState = {
    address: '',
    country: '',
    postalCode: '',
    city: '',
  };

  const [shippingDetails, setShippingDetails] =
    useState<ShippingDetails>(initialState);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // history.push('/payment');
  };

  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 /> */}
      <h1>Shipping</h1>

      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={shippingDetails.address}
            onChange={e =>
              setShippingDetails({
                ...shippingDetails,
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
            value={shippingDetails.city}
            onChange={e =>
              setShippingDetails({ ...shippingDetails, city: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={shippingDetails.postalCode}
            onChange={e =>
              setShippingDetails({
                ...shippingDetails,
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
            value={shippingDetails.country}
            onChange={e =>
              setShippingDetails({
                ...shippingDetails,
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
