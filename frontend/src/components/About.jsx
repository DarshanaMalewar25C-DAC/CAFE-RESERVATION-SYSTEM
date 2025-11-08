import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-4 fw-bold mb-4">About Café Delight</h2>
            <p className="lead">
              Since 2010, Café Delight has been serving the community with exceptional coffee, 
              delicious meals, and a warm, welcoming atmosphere that feels like home.
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-coffee fa-3x text-primary"></i>
                </div>
                <Card.Title className="h4">Premium Coffee</Card.Title>
                <Card.Text>
                  We source the finest beans from around the world and roast them to perfection, 
                  ensuring every cup delivers exceptional flavor and aroma.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-utensils fa-3x text-primary"></i>
                </div>
                <Card.Title className="h4">Fresh Cuisine</Card.Title>
                <Card.Text>
                  Our kitchen crafts delicious meals using fresh, locally-sourced ingredients. 
                  From hearty breakfasts to gourmet dinners, we have something for everyone.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <i className="fas fa-heart fa-3x text-primary"></i>
                </div>
                <Card.Title className="h4">Warm Atmosphere</Card.Title>
                <Card.Text>
                  Our cozy interior and friendly staff create the perfect environment for 
                  catching up with friends, working, or simply enjoying a peaceful moment.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;