import Link from 'next/link';
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAdmin, useOrderActions, useTypedSelector } from '../../hooks';
import Loader from '../Loader';
import Message from '../Message';

const OrdersList = () => {
  useAdmin();

  const { data, loading, error } = useTypedSelector(state => state.orders);
  const { fetchOrders } = useOrderActions();

  const user = useTypedSelector(state => state.user);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, user.data]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(_order => (
              <tr key={_order._id}>
                <td>{_order._id}</td>
                <td>{_order.user && _order.user.name}</td>
                <td>{_order.createdAt?.substring(0, 10)}</td>
                <td>${_order.totalPrice}</td>
                <td>
                  {_order.isPaid ? (
                    _order.paidAt?.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {_order.isDelivered ? (
                    _order.deliveredAt?.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link href={`/orders/${_order._id}`} passHref>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersList;
