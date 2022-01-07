import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { ProductInterface } from '../../../interfaces';

interface ProductProps {
  product: ProductInterface;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link href={`/product/${product._id}`}></Link>
    </Card>
  );
};

export default Product;
