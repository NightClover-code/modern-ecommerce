import { useCartActions, useTypedSelector } from '../../hooks';
import Link from 'next/link';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { v4 as randomID } from 'uuid';
import Message from '../Message';
import { useEffect } from 'react';
import Loader from '../Loader';

const Cart: React.FC = () => {
  const {
    loading,
    error,
    data: { cartItems },
  } = useTypedSelector(state => state.cart);
  const { addToCart, getCartItems } = useCartActions();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const onRemoveFromCartHandler = (id: string) => {
    console.log('remove');
  };

  const onCheckoutHandler = () => {};

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link href="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              cartItems.map(item => (
                <ListGroup.Item key={randomID()}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link href={`/product/${item.productId}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={e =>
                          addToCart({
                            qty: parseInt(e.target.value),
                            productId: item.productId,
                          })
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={randomID()} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => onRemoveFromCartHandler(item.productId)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={onCheckoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
