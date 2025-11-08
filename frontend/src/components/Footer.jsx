import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Café Delight</h5>
            <p>Experience exceptional dining with our table booking system.</p>
          </Col>
          <Col md={4}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact Us</Link></li>
              <li><Link to="/login" className="text-white-50 text-decoration-none">Login</Link></li>
              <li><Link to="/admin-login" className="text-white-50 text-decoration-none">Admin Portal</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Contact Info</h6>
            <p className="text-white-50 mb-1">📍 123 Café Street, City</p>
            <p className="text-white-50 mb-1">📞 +91 98765 43210</p>
            <p className="text-white-50">✉️ info@cafedelight.com</p>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <p className="mb-0 text-white-50">&copy; 2024 Café Delight. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;