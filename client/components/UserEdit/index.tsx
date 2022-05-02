import Link from 'next/link';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks';
import { UserEditCredentials } from '../../interfaces';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

const UserEdit = () => {
  const initialCredentials = {
    name: '',
    email: '',
    isAdmin: false,
  };

  const { loading, error, data } = useTypedSelector(state => state.user);

  const [credentials, setCredentials] =
    useState<UserEditCredentials>(initialCredentials);

  return (
    <>
      <Link href="/admin/users" passHref>
        <div className="btn btn-light my-3">Go back</div>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        {loading && <Loader />}
        {error && <Message variant="danger">{}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form>
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

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={credentials.isAdmin}
                onChange={e =>
                  setCredentials({ ...credentials, isAdmin: e.target.checked })
                }
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
