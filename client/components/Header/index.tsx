//importing components
import Link from 'next/link';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useTypedSelector, useUserActions } from '../../hooks';

const Header = () => {
  const { data } = useTypedSelector(state => state.user);
  const { logout } = useUserActions();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link href="/cart" passHref>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </Link>
              {data ? (
                <NavDropdown title={data.name} id="username">
                  <Link href="/profile" passHref>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link href="/login" passHref>
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </Link>
              )}

              {data && data.isAdmin && (
                <NavDropdown title="Admin" id="username">
                  <Link href="/admin/users" passHref>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </Link>
                  <Link href="/admin/products" passHref>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </Link>
                  <Link href="/admin/orders" passHref>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
