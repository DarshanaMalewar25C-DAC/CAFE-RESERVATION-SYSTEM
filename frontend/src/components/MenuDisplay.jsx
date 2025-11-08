import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const MenuDisplay = () => {
  const menuData = {
    'South Indian': [
      { name: 'Idli Sambar', price: 40, description: 'Steamed rice cakes with lentil curry' },
      { name: 'Medu Wada Sambar', price: 50, description: 'Fried lentil donuts with sambar' },
      { name: 'Plain Dosa', price: 40, description: 'Crispy rice and lentil crepe' },
      { name: 'Butter Dosa', price: 50, description: 'Crispy dosa with butter' }
    ],
    'Tea': [
      { name: 'Lemon Tea', price: 15, description: 'Refreshing tea with lemon' },
      { name: 'Special Tea', price: 20, description: 'House special blend tea' }
    ],
    'Beverages': [
      { name: 'Cold Coffee', price: 30, description: 'Chilled coffee drink' },
      { name: 'Special Cold Coffee', price: 40, description: 'Premium cold coffee blend' },
      { name: 'Cold Coffee with Crush', price: 50, description: 'Cold coffee with ice crush' },
      { name: 'Hot Chocolate', price: 30, description: 'Rich hot chocolate drink' }
    ],
    'Pav Bhaji': [
      { name: 'Pav Bhaji', price: 70, description: 'Spiced vegetable curry with bread' },
      { name: 'Masala Cheese Dosa', price: 75, description: 'Spiced dosa with cheese filling' }
    ],
    'Pasta & Fries': [
      { name: 'Red Pasta', price: 80, description: 'Pasta in tomato sauce' },
      { name: 'Cheese Red Pasta', price: 90, description: 'Red pasta with cheese' },
      { name: 'White Pasta', price: 80, description: 'Pasta in white sauce' },
      { name: 'Creamy White Pasta', price: 90, description: 'Extra creamy white pasta' }
    ],
    'Pizza': [
      { name: 'Margherita Pizza', price: 130, description: 'Classic tomato and cheese pizza' },
      { name: 'Farmhouse Pizza', price: 150, description: 'Loaded vegetable pizza' },
      { name: 'Paneer Tandoori Pizza', price: 160, description: 'Pizza with tandoori paneer' }
    ],
    'Pizza & Burger': [
      { name: 'Cheese Corn Pizza', price: 60, description: 'Small pizza with cheese and corn' },
      { name: 'Veggie Burger', price: 70, description: 'Vegetarian burger with fresh veggies' },
      { name: 'Aloo Tikki Burger', price: 50, description: 'Burger with potato patty' },
      { name: 'Veggie Double Patty Burger', price: 80, description: 'Double patty veggie burger' }
    ],
    'Sandwiches': [
      { name: 'Veg Sandwich', price: 25, description: 'Fresh vegetable sandwich' },
      { name: 'Veg Cheese Sandwich', price: 35, description: 'Veggie sandwich with cheese' },
      { name: 'Corn Sandwich', price: 40, description: 'Sweet corn sandwich' },
      { name: 'Corn Cheese Sandwich', price: 50, description: 'Corn sandwich with cheese' }
    ],
    'Grilled Sandwiches': [
      { name: 'Veg Grilled Sandwich', price: 30, description: 'Grilled vegetable sandwich' },
      { name: 'Veg Cheese Grilled Sandwich', price: 40, description: 'Grilled veggie sandwich with cheese' },
      { name: 'Corn Grilled Sandwich', price: 50, description: 'Grilled corn sandwich' },
      { name: 'Corn Cheese Grilled Sandwich', price: 60, description: 'Grilled corn sandwich with cheese' }
    ]
  };

  const categories = Object.keys(menuData);
  const totalItems = Object.values(menuData).reduce((sum, items) => sum + items.length, 0);

  return (
    <Container className="mt-4">
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold text-primary mb-4">Our Complete Menu</h2>
        <p className="lead text-muted">
          Discover our carefully curated selection of delicious food and beverages.
        </p>
      </div>
      
      <Row className="g-4">
        {categories.map(category => (
          <Col lg={4} key={category}>
            <Card className="menu-category-card h-100 border-0 shadow-sm">
              <Card.Header className="bg-primary text-white text-center py-3">
                <h4 className="mb-0">{category}</h4>
              </Card.Header>
              <Card.Body className="p-4">
                {menuData[category].map((item, itemIndex) => (
                  <div key={itemIndex} className="menu-item mb-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="menu-item-name mb-0">{item.name}</h6>
                      <span className="badge bg-secondary menu-price">₹{item.price}</span>
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
            <em>Complete menu with {totalItems} delicious items across {categories.length} categories!</em>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuDisplay;