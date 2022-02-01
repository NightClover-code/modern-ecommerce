import Link from 'next/link';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Loader from '../Loader';
import { useState } from 'react';
import Message from '../Message';
import { useTypedSelector } from '../../hooks';
import { UserCredentials } from '../../interfaces';

const Profile = () => {
  const initialCredentials = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  const { loading, error, data } = useTypedSelector(state => state.userLogin);

  const [credentials, setCredentials] =
    useState<UserCredentials>(initialCredentials);
  const [message, setMessage] = useState<string | null | string[]>(error);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {}
        {/* {success && <Message variant="success">Profile Updated</Message>} */}
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
                value={credentials.name!}
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
                value={credentials.email!}
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
                value={credentials.password!}
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
                value={credentials.confirmPassword!}
                onChange={e =>
                  setCredentials({
                    ...credentials,
                    confirmPassword: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      {/* <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            {/* <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link href={`/order/${order._id}`} passHref>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody> 
                    </Table>
                    
        )}
      </Col>
      */}
    </Row>
  );
};

export default Profile;
