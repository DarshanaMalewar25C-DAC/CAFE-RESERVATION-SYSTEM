import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Amenities = () => {
  const amenities = [
    { icon: 'fas fa-wifi', title: 'Free Wi-Fi', description: 'High-speed internet throughout the café' },
    { icon: 'fas fa-car', title: 'Free Parking', description: 'Convenient parking spaces available' },
    { icon: 'fas fa-tree', title: 'Outdoor Seating', description: 'Beautiful patio with garden views' },
    { icon: 'fas fa-music', title: 'Live Music', description: 'Acoustic performances on weekends' },
    { icon: 'fas fa-wheelchair', title: 'Accessible', description: 'Wheelchair accessible entrance and seating' },
    { icon: 'fas fa-dog', title: 'Pet Friendly', description: 'Well-behaved pets welcome on patio' }
  ];

  return (
    <section id="amenities" className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-4 fw-bold mb-4">Amenities</h2>
            <p className="lead">
              We've thoughtfully designed our space with amenities to make your visit 
              comfortable and enjoyable.
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {amenities.map((amenity, index) => (
            <Col md={4} key={index}>
              <Card className="amenity-card h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="amenity-icon mb-3">
                    <i className={`${amenity.icon} fa-2x text-primary`}></i>
                  </div>
                  <Card.Title className="h5 mb-3">{amenity.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {amenity.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Amenities;