import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Gallery = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Cozy Interior"
    },
    {
      src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Outdoor Seating"
    },
    {
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Coffee Bar"
    },
    {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Dining Area"
    },
    {
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Private Booth"
    },
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Evening Ambiance"
    }
  ];

  return (
    <section id="gallery" className="py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-4 fw-bold mb-4">Gallery</h2>
            <p className="lead">
              Take a visual tour of our beautiful café and discover the perfect ambiance 
              for your next visit.
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {images.map((image, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="gallery-card border-0 shadow-sm overflow-hidden">
                <div className="gallery-image-wrapper">
                  <Card.Img 
                    variant="top" 
                    src={image.src} 
                    alt={image.title}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <h5 className="text-white">{image.title}</h5>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Gallery;