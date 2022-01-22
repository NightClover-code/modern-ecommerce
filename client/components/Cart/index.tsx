import { useCartActions, useTypedSelector } from '../../hooks';
import Link from 'next/link';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { NextRouter } from 'next/router';
import { useEffect } from 'react';

interface CartProps {
  router: NextRouter;
}

const Cart: React.FC<CartProps> = ({ router }) => {
  const { qty } = router.query;
  const { addToCart } = useCartActions();

  useEffect(() => {
    addToCart(parseInt(qty as string));
  }, [addToCart, qty]);

  return <div>Cart</div>;
};

export default Cart;
