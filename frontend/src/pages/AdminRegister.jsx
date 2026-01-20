import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { showToast } from '../components/Toast';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminToken: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Submitting admin registration:', formData);
      const response = await authAPI.register(formData);
      console.log('Registration response:', response.data);
      showToast.success('🔑 Admin Account Created Successfully!');
      setTimeout(() => navigate('/admin-login'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      showToast.error(error.response?.data?.error || 'Registration failed');
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
                  <i className="fas fa-user-shield fa-3x text-primary mb-3"></i>
                  <h2 className="fw-bold text-primary mb-2">Admin Registration</h2>
                  <p className="text-muted">Create admin account</p>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      size="lg"
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      size="lg"
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      size="lg"
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Admin Token</Form.Label>
                    <Form.Control
                      type="password"
                      name="adminToken"
                      value={formData.adminToken}
                      onChange={handleChange}
                      placeholder="Enter admin token"
                      size="lg"
                      required
                    />
                    <Form.Text className="text-muted">
                      Admin token is required to register as an administrator<br/>
                     {/* <small className="text-info">Hint: Use "ADMIN2024" as the admin token</small>*/}
                    </Form.Text>
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Admin Account'}
                  </Button>
                </Form>
                
                <div className="text-center">
                  <p className="mb-0">
                    Already have admin account?{' '}
                    <Link to="/admin-login" className="text-primary fw-semibold text-decoration-none">
                      Sign In
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

export default AdminRegister;