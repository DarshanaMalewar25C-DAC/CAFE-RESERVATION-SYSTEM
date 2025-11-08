import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/auth-context';
import { showToast } from '../components/Toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      const user = response.data.user;
      
      if (user.role !== 'admin') {
        showToast.error('🚫 Access denied. Admin credentials required.');
        return;
      }
      
      login(user, response.data.token);
      showToast.success('✅ Admin Login Successful!');
      navigate('/admin');
    } catch (error) {
      showToast.error('🚫 Invalid Admin Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                  <h2 className="fw-bold text-primary mb-2">Admin Portal</h2>
                  <p className="text-muted">Sign in to admin dashboard</p>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Admin Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter admin email"
                      size="lg"
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      size="lg"
                      required
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Admin Sign In'}
                  </Button>
                </Form>
                
                <div className="text-center">
                  <p className="mb-0">
                    Need admin access?{' '}
                    <Link to="/admin-register" className="text-primary fw-semibold text-decoration-none">
                      Register as Admin
                    </Link>
                  </p>
                </div>
                
                <div className="text-center mt-4">
                  <Link to="/" className="text-muted text-decoration-none">
                    ← Back to Home
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;