import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/auth-context';
import { useLocation } from 'react-router-dom';
import { showToast } from './Toast';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Hide navbar on landing page
  if (location.pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    logout();
    showToast.success('Logged out successfully');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to={user ? "/home" : "/"}>
          <Navbar.Brand className="fw-bold">
            <i className="fas fa-coffee me-2"></i>
            Café Delight
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {user?.role === 'user' && (
              <>
                <LinkContainer to="/home">
                  <Nav.Link>
                    <i className="fas fa-table me-1"></i>
                    Book Table
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/bookings">
                  <Nav.Link>
                    <i className="fas fa-calendar-alt me-1"></i>
                    My Bookings
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <LinkContainer to="/admin">
                  <Nav.Link>
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Admin Dashboard
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  <i className="fas fa-user me-1"></i>
                  Hello, {user.name}
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin-login">
                  <Nav.Link>
                    <i className="fas fa-user-shield me-1"></i>
                    Admin Login
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;