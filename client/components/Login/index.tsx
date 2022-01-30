import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTypedSelector, useUserActions } from '../../hooks';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useUserActions();
  const { loading, error, data } = useTypedSelector(state => state.userLogin);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!error || (email.length > 0 && password.length > 0)) {
      login(email, password);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="py-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link href="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
