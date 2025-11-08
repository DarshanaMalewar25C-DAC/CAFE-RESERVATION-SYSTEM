import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const MenuPreview = () => {
  const menuItems = [
    {
      category: 'South Indian',
      items: [
        { name: 'Idli Sambar', price: '₹40', description: 'Steamed rice cakes with lentil curry' },
        { name: 'Medu Wada Sambar', price: '₹50', description: 'Fried lentil donuts with sambar' },
        { name: 'Plain Dosa', price: '₹40', description: 'Crispy rice and lentil crepe' },
        { name: 'Butter Dosa', price: '₹50', description: 'Crispy dosa with butter' }
      ]
    },
    {
      category: 'Beverages',
      items: [
        { name: 'Cold Coffee', price: '₹30', description: 'Chilled coffee drink' },
        { name: 'Special Cold Coffee', price: '₹40', description: 'Premium cold coffee blend' },
        { name: 'Cold Coffee with Crush', price: '₹50', description: 'Cold coffee with ice crush' },
        { name: 'Hot Chocolate', price: '₹30', description: 'Rich hot chocolate drink' }
      ]
    },
    {
      category: 'Sandwiches',
      items: [
        { name: 'Veg Sandwich', price: '₹25', description: 'Fresh vegetable sandwich' },
        { name: 'Veg Cheese Sandwich', price: '₹35', description: 'Veggie sandwich with cheese' },
        { name: 'Corn Sandwich', price: '₹40', description: 'Sweet corn sandwich' },
        { name: 'Corn Cheese Sandwich', price: '₹50', description: 'Corn sandwich with cheese' }
      ]
    }
  ];

  return (
    <section id="menu" className="py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-4 fw-bold mb-4">Menu Preview</h2>
            <p className="lead">
              Discover our carefully curated selection of coffee, fresh food, and delightful treats.
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {menuItems.map((category, categoryIndex) => (
            <Col lg={4} key={categoryIndex}>
              <Card className="menu-category-card h-100 border-0 shadow-sm">
                <Card.Header className="bg-primary text-white text-center py-3">
                  <h4 className="mb-0">{category.category}</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="menu-item mb-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="menu-item-name mb-0">{item.name}</h6>
                        <Badge bg="secondary" className="menu-price">{item.price}</Badge>
                      </div>
                      <p className="menu-item-description text-muted small mb-0">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <Row className="mt-5">
          <Col className="text-center">
            <p className="text-muted">
              <em>This is just a preview of our menu. Visit us to see our full selection!</em>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MenuPreview;