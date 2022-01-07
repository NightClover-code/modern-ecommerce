//importing types & utils
import { v4 as randomID } from 'uuid';
import { ProductInterface } from '../../interfaces';
//importing components
import { Row, Col } from 'react-bootstrap';
import Item from './Item';

interface ProductsProps {
  products: ProductInterface[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <>
      <h1 className="py-2">Latest products</h1>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={randomID()}>
            <Item {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;
