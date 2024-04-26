//importing components
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Made with 💖 By{' '}
            <a
              href="https://github.com/NightClover-code"
              target="_blank"
              rel="noreferrer"
            >
              NightClover-code
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
