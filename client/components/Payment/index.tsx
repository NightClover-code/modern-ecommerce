import FormContainer from '../FormContainer';
import CheckoutSteps from '../CheckoutSteps';
import { Form, Col, Button } from 'react-bootstrap';
import { useState, FormEvent } from 'react';
import { useCartActions, useShipping } from '../../hooks';

const Payment = () => {
  useShipping();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const { savePaymentMethod } = useCartActions();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    savePaymentMethod(paymentMethod);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              className="py-3"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
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
