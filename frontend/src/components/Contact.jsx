import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { showToast } from './Toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    showToast.success('📨 Feedback Submitted Successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-4 fw-bold mb-4">Contact Us</h2>
            <p className="lead">
              We'd love to hear from you! Get in touch with us for reservations, 
              questions, or just to say hello.
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4">Get in Touch</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" size="lg" className="w-100">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4">Visit Us</h4>
                
                <div className="contact-info">
                  <div className="contact-item mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-map-marker-alt fa-lg text-primary me-3"></i>
                      <div>
                        <h6 className="mb-1">Address</h6>
                        <p className="text-muted mb-0">123 Coffee Street, Downtown, City 12345</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="contact-item mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-phone fa-lg text-primary me-3"></i>
                      <div>
                        <h6 className="mb-1">Phone</h6>
                        <p className="text-muted mb-0">(555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="contact-item mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-envelope fa-lg text-primary me-3"></i>
                      <div>
                        <h6 className="mb-1">Email</h6>
                        <p className="text-muted mb-0">info@cafedelight.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="contact-item mb-4">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-clock fa-lg text-primary me-3"></i>
                      <div>
                        <h6 className="mb-1">Hours</h6>
                        <p className="text-muted mb-0">
                          Mon-Fri: 6:00 AM - 10:00 PM<br />
                          Sat-Sun: 7:00 AM - 11:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Team Section */}
        <Row className="mt-5">
          <Col lg={12}>
            <div className="text-center mb-5">
              <h3 className="fw-bold mb-3">Meet Our Development Team</h3>
              <p className="text-muted">The talented individuals who brought this project to life</p>
            </div>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col lg={4} md={6}>
            <Card className="border-0 shadow-sm text-center h-100">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <i className="fas fa-user-circle fa-4x text-primary"></i>
                </div>
                <h5 className="fw-bold mb-2">Darshana Malewar</h5>
                
                <div className="contact-details mb-3">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <i className="fas fa-envelope text-primary me-2"></i>
                    <small>darshana.malewar@gmail.com</small>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-phone text-primary me-2"></i>
                    <small>+91 98765 43210</small>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <i className="fab fa-react text-info"></i>
                  <i className="fab fa-node-js text-success"></i>
                  <i className="fas fa-database text-warning"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4} md={6}>
            <Card className="border-0 shadow-sm text-center h-100">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <i className="fas fa-user-circle fa-4x text-success"></i>
                </div>
                <h5 className="fw-bold mb-2">Minal Kamde</h5>
               
                <div className="contact-details mb-3">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <i className="fas fa-envelope text-success me-2"></i>
                    <small>minal.kamde@gmail.com</small>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-phone text-success me-2"></i>
                    <small>+91 87654 32109</small>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <i className="fab fa-node-js text-success"></i>
                  <i className="fas fa-server text-secondary"></i>
                  <i className="fas fa-shield-alt text-primary"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4} md={6}>
            <Card className="border-0 shadow-sm text-center h-100">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <i className="fas fa-user-circle fa-4x text-warning"></i>
                </div>
                <h5 className="fw-bold mb-2">Neha Kothavade</h5>
                
                <div className="contact-details mb-3">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <i className="fas fa-envelope text-warning me-2"></i>
                    <small>neha.kothavade@gmail.com</small>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-phone text-warning me-2"></i>
                    <small>+91 76543 21098</small>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <i className="fab fa-figma text-danger"></i>
                  <i className="fab fa-bootstrap text-purple"></i>
                  <i className="fab fa-css3-alt text-info"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;