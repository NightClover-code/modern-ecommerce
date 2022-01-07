//importing utils
import products from '../../utils/products';
import { v4 as randomID } from 'uuid';
//importing components
import { Row, Col } from 'react-bootstrap';

const Products = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={randomID()}>
            <h3>{product.name}</h3>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Products;
