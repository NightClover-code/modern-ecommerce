import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAdmin, useTypedSelector, useUserActions } from '../../hooks';
import { UserEditCredentials } from '../../interfaces';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

interface UserEditProps {
  pageId: string | string[] | undefined;
}

const UserEdit: React.FC<UserEditProps> = ({ pageId }) => {
  useAdmin();

  const initialCredentials = {
    name: '',
    email: '',
    isAdmin: false,
  };

  const { loading, error } = useTypedSelector(state => state.user);
  const { fetchUser } = useUserActions();

  const [credentials, setCredentials] =
    useState<UserEditCredentials>(initialCredentials);

  useEffect(() => {
    fetchUser(pageId as string);
  }, [fetchUser, pageId]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Link href="/admin/users" passHref>
        <div className="btn btn-light my-3">Go back</div>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

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
