//importing utils
import { ProductInterface } from '../../../interfaces';
//importing components
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Rating from '../../Rating';

const Product: React.FC<ProductInterface> = ({
  _id,
  image,
  name,
  rating,
  numReviews,
  price,
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link href={`/product/${_id}`} passHref>
        <Card.Img src={image} variant="top"></Card.Img>
      </Link>

      <Card.Body>
        <Link href={`/product/${_id}`} passHref>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-2">
            <Rating value={rating} text={`${numReviews} reviews`} />
          </div>
        </Card.Text>

        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
