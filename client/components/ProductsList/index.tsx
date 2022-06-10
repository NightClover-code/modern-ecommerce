import Link from 'next/link';
import { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { useAdmin, useProductsActions, useTypedSelector } from '../../hooks';
import Loader from '../Loader';
import Message from '../Message';

const ProductsList = () => {
  useAdmin();

  const { fetchProducts, deleteProduct, createProduct } = useProductsActions();

  const user = useTypedSelector(state => state.user);
  const { loading, error, data } = useTypedSelector(state => state.products);
  const { success: successDelete } = useTypedSelector(
    state => state.productDelete
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, successDelete]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={() => createProduct()}
            style={{ float: 'right' }}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(_product => (
                <tr key={_product._id}>
                  <td>{_product._id}</td>
                  <td>{_product.name}</td>
                  <td>${_product.price}</td>
                  <td>{_product.category}</td>
                  <td>{_product.brand}</td>
                  <td>
                    <Link
                      href={`/admin/products/edit/${_product._id}`}
                      passHref
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you want to delete this product?'
                          )
                        ) {
                          deleteProduct(_product._id);
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default ProductsList;
