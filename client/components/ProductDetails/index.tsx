//importing hooks
import { useProductsActions, useTypedSelector } from '../../hooks';
import { useEffect } from 'react';
//importing components
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../Rating';
import Loader from '../Loader';
import Message from '../Message';

interface ProductDetailsProps {
  pageId: string | string[] | undefined;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ pageId }) => {
  const { fetchProduct } = useProductsActions();
  const { loading, error, product } = useTypedSelector(state => state.product);

  const { image, name, price, countInStock, description, rating, numReviews } =
    product;

  useEffect(() => {
    if (!pageId) return;

    fetchProduct(pageId as string);
  }, [fetchProduct, pageId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                    <Col>{countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button className="w-100" type="button">
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetails;
