import FormContainer from '../FormContainer';
import CheckoutSteps from '../CheckoutSteps';
import { Form, Col, Button } from 'react-bootstrap';
import { useState, FormEvent } from 'react';
import { useTypedSelector } from '../../hooks';
import { useRouter } from 'next/router';

const Payment = () => {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const { shippingDetails } = useTypedSelector(state => state.cart.data);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
