import { v4 as randomID } from 'uuid';
import {
  useCartActions,
  useProductsActions,
  useTypedSelector,
} from '../../hooks';
import { FormEvent, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../Rating';
import Loader from '../Loader';
import Message from '../Message';
import Link from 'next/link';

interface ProductDetailsProps {
  pageId: string | string[] | undefined;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ pageId }) => {
  const [qty, setQty] = useState(1);
  const [_rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { fetchProduct, createProductReview } = useProductsActions();
  const { addToCart } = useCartActions();

  const { loading, error, data } = useTypedSelector(state => state.product);
  const { loading: cartLoading } = useTypedSelector(state => state.cart);
  const { data: user } = useTypedSelector(state => state.user);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = useTypedSelector(state => state.productCreateReview);

  const { image, name, price, countInStock, description, rating, numReviews } =
    data;

  useEffect(() => {
    if (!pageId) return;

    fetchProduct(pageId as string);
  }, [fetchProduct, pageId]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProductReview(pageId as string, { rating: _rating, comment });
  };

  return (
    <>
      <Link href="/" passHref>
        <div className="btn btn-light my-3">Go Back</div>
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={rating} text={`${numReviews} reviews`} />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${price}</ListGroup.Item>
                <ListGroup.Item>Description: {description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={e => setQty(parseInt(e.target.value))}
                          >
                            {[...Array(countInStock).keys()].map(x => (
                              <option key={randomID()} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={() => {
                        addToCart({
                          product: data,
                          qty,
                        });
                      }}
                      className="w-100"
                      type="button"
                      disabled={countInStock === 0}
                    >
                      {cartLoading ? (
                        <Loader options={{ width: '25px', height: '25px' }} />
                      ) : (
                        <>Add To Cart</>
                      )}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {data.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {data.reviews.map(_review => (
                  <ListGroup.Item key={_review._id}>
                    <strong>{_review.name}</strong>
                    <Rating value={_review.rating} />
                    <p>{_review.createdAt?.substring(0, 10)}</p>
                    <p>{_review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingReview && <Loader />}
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {user ? (
                    <Form onSubmit={onSubmitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={_rating}
                          onChange={e => setRating(parseInt(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link href="/login">sign in</Link> to write a
                      review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetails;
