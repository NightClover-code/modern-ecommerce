//importing types & utils
import { v4 as randomID } from 'uuid';
//importing hooks
import { useEffect } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
//importing components
import { Row, Col, Button } from 'react-bootstrap';
import Item from './Item';
import Loader from '../Loader';
import Message from '../Message';
import Paginate from '../Paginate';
import ProductCarousel from '../ProductCarousel';
import Link from 'next/link';

interface ProductsInterface {
  keyword?: query;
  pageId?: query;
}

const Products: React.FC<ProductsInterface> = ({ keyword, pageId }) => {
  const { fetchProducts } = useProductsActions();
  const {
    loading,
    error,
    data: { products, pages, page },
  } = useTypedSelector(state => state.products);

  useEffect(() => {
    fetchProducts(keyword as string, parseInt(pageId as string));
  }, [fetchProducts, keyword, pageId]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link href="/" passHref>
          <Button className="btn btn-light">Go back</Button>
        </Link>
      )}

      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col sm={12} md={6} lg={4} xl={3} key={randomID()}>
                <Item {...product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default Products;
