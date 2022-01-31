import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTypedSelector, useUserActions } from '../../hooks';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

const Register = () => {
  const initialCredentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [credentials, setCredentials] = useState(initialCredentials);
  const [message, setMessage] = useState(null);

  const { register } = useUserActions();
  const { loading, error, data } = useTypedSelector(state => state.user);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    register(name, email, password);
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={credentials.name}
            onChange={e =>
              setCredentials({ ...credentials, name: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="py-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={e =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={e =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="py-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={credentials.confirmPassword}
            onChange={e =>
              setCredentials({
                ...credentials,
                confirmPassword: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-1">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link href="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
