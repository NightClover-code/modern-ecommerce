import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../FormContainer';

const UserEditScreen = () => {
  return (
    <>
      <div className="btn btn-light my-3">
        <Link href="/admin/users">Go Back</Link>
      </div>
      <FormContainer>
        <h1>Edit User</h1>

        {/* {loadingUpdate && <Loader />} */}
        {/* {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
