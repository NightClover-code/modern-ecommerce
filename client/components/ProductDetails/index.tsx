//importing types
import { ProductInterface } from '../../interfaces';
//importing components
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../Rating';

const ProductDetails: React.FC<ProductInterface> = ({
  image,
  name,
  rating,
  numReviews,
  price,
  description,
  countInStock,
}) => {
  return (
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
  );
};

export default ProductDetails;
