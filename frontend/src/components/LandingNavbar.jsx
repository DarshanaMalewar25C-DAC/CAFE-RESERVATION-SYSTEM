import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="white" variant="light" expand="lg" className="landing-navbar shadow-sm fixed-top">
      <Container>
        <Navbar.Brand className="fw-bold text-primary">
          <i className="fas fa-coffee me-2"></i>
          Café Delight
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="#gallery">Gallery</Nav.Link>
            <Nav.Link href="#menu">Menu</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            <Button 
              variant="outline-primary" 
              className="me-2"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              variant="primary"
              onClick={() => navigate('/admin-login')}
            >
              Admin Portal
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LandingNavbar;