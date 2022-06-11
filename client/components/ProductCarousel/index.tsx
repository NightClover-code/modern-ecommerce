import React, { useEffect } from 'react';
import Link from 'next/link';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { useProductsActions, useTypedSelector } from '../../hooks';

const ProductCarousel = () => {
  const { fetchTopRatedProducts } = useProductsActions();

  const { loading, error, data } = useTypedSelector(
    state => state.productsTopRated
  );

  useEffect(() => {
    fetchTopRatedProducts();
  }, [fetchTopRatedProducts]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {data.map(_product => (
        <Carousel.Item key={_product._id}>
          <Link href={`/product/${_product._id}`} passHref>
            <Image src={_product.image} alt={_product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {_product.name} (${_product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
