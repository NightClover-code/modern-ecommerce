import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import Link from 'next/link';
import { useOrderActions, useTypedSelector } from '../../hooks';
import Loader from '../Loader';
import Message from '../Message';
import { useEffect } from 'react';
import { paypalClientId } from '../../utils';

interface OrderProps {
  pageId: string | string[] | undefined;
}

const Order: React.FC<OrderProps> = ({ pageId }) => {
  const { loading, data, error, success } = useTypedSelector(
    state => state.order
  );
  const { fetchOrder, payOrder } = useOrderActions();

  useEffect(() => {
    if (!data._id || success) {
      if (!pageId) return;

      fetchOrder(pageId as string);
    }
  }, [fetchOrder, pageId, success, data]);

  const onPaymentHandler = ({id, payer: {email_address}, update_time}, status: any) => {
    const paymentResult = {
      id,
      email_address,
      update_time,
      status,
    }

    payOrder(data._id!, paymentResult);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {data._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {data.user?.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${data.user?.email}`}>{data.user?.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {data.shippingDetails.address}, {data.shippingDetails.city}{' '}
                {data.shippingDetails.postalCode},{' '}
                {data.shippingDetails.country}
              </p>
              {data.isDelivered ? (
                <Message variant="success">
                  Delivered on {data.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {data.paymentMethod}
              </p>
              {data.isPaid ? (
                <Message variant="success">Paid on {data.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {data.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {data.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link href={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${data.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {data.shippingPrice !== 0
                      ? `$${data.shippingPrice}`
                      : 'Free'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${data.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${data.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!data.isPaid && (
                <ListGroup.Item>
                  {loading && <Loader />}

                  <PayPalButton
                    options={{
                      clientId: paypalClientId,
                    }}
                    amount={data.totalPrice}
                    onSuccess={onPaymentHandler}
                  />
                </ListGroup.Item>
              )}
              {/* {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                data.isPaid &&
                !data.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}*/}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
