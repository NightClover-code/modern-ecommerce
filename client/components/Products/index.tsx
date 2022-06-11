//importing types & utils
import { v4 as randomID } from 'uuid';
//importing hooks
import { useEffect } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
//importing components
import { Row, Col } from 'react-bootstrap';
import Item from './Item';
import Loader from '../Loader';
import Message from '../Message';

interface ProductsInterface {
  keyword?: string | string[] | undefined;
}

const Products: React.FC<ProductsInterface> = ({ keyword }) => {
  const { fetchProducts } = useProductsActions();
  const { loading, error, data } = useTypedSelector(state => state.products);

  useEffect(() => {
    fetchProducts(keyword as string);
  }, [fetchProducts, keyword]);

  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          data.map(product => (
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
