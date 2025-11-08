import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center" style={{marginTop: '76px'}}>
      <Container fluid className="p-0">
        <div className="hero-content">
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6}>
                <div className="hero-text">
                  <h1 className="display-3 fw-bold mb-4">
                    Welcome to <span className="text-primary">Café Delight</span>
                  </h1>
                  <p className="lead mb-4">
                    Experience the perfect blend of exceptional coffee, delicious food, 
                    and warm ambiance. Reserve your table for an unforgettable dining experience.
                  </p>
                  <div className="hero-buttons">
                    <Button 
                      size="lg" 
                      className="me-3 px-4 py-2"
                      onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore More
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="lg" 
                      className="px-4 py-2"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="hero-image">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Café Interior" 
                    className="img-fluid rounded-3 shadow-lg"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </section>
  );
};

export default Hero;