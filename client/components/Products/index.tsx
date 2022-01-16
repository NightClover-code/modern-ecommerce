//importing types & utils
import { v4 as randomID } from 'uuid';
//importing components
import { Row, Col } from 'react-bootstrap';
import Item from './Item';
import { useEffect } from 'react';
import { useProductsActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Products: React.FC = () => {
  const { fetchProducts } = useProductsActions();
  const { loading, error, products } = useTypedSelector(
    state => state.products
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <h1 className="py-2">Latest products</h1>
      <Row>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3} key={randomID()}>
              <Item {...product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default Products;
