import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { showToast } from '../Toast';

const MenuManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState('category');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  });
  
  const menuData = {
    'South Indian': [
      { id: 1, name: 'Idli Sambar', price: 40, description: 'Steamed rice cakes with lentil curry' },
      { id: 2, name: 'Medu Wada Sambar', price: 50, description: 'Fried lentil donuts with sambar' },
      { id: 3, name: 'Plain Dosa', price: 40, description: 'Crispy rice and lentil crepe' },
      { id: 4, name: 'Butter Dosa', price: 50, description: 'Crispy dosa with butter' }
    ],
    'Tea': [
      { id: 5, name: 'Lemon Tea', price: 15, description: 'Refreshing tea with lemon' },
      { id: 6, name: 'Special Tea', price: 20, description: 'House special blend tea' }
    ],
    'Beverages': [
      { id: 7, name: 'Cold Coffee', price: 30, description: 'Chilled coffee drink' },
      { id: 8, name: 'Special Cold Coffee', price: 40, description: 'Premium cold coffee blend' },
      { id: 9, name: 'Cold Coffee with Crush', price: 50, description: 'Cold coffee with ice crush' },
      { id: 10, name: 'Hot Chocolate', price: 30, description: 'Rich hot chocolate drink' }
    ],
    'Pav Bhaji': [
      { id: 11, name: 'Pav Bhaji', price: 70, description: 'Spiced vegetable curry with bread' },
      { id: 12, name: 'Masala Cheese Dosa', price: 75, description: 'Spiced dosa with cheese filling' }
    ],
    'Pasta & Fries': [
      { id: 13, name: 'Red Pasta', price: 80, description: 'Pasta in tomato sauce' },
      { id: 14, name: 'Cheese Red Pasta', price: 90, description: 'Red pasta with cheese' },
      { id: 15, name: 'White Pasta', price: 80, description: 'Pasta in white sauce' },
      { id: 16, name: 'Creamy White Pasta', price: 90, description: 'Extra creamy white pasta' }
    ],
    'Pizza': [
      { id: 17, name: 'Margherita Pizza', price: 130, description: 'Classic tomato and cheese pizza' },
      { id: 18, name: 'Farmhouse Pizza', price: 150, description: 'Loaded vegetable pizza' },
      { id: 19, name: 'Paneer Tandoori Pizza', price: 160, description: 'Pizza with tandoori paneer' }
    ],
    'Pizza & Burger': [
      { id: 20, name: 'Cheese Corn Pizza', price: 60, description: 'Small pizza with cheese and corn' },
      { id: 21, name: 'Veggie Burger', price: 70, description: 'Vegetarian burger with fresh veggies' },
      { id: 22, name: 'Aloo Tikki Burger', price: 50, description: 'Burger with potato patty' },
      { id: 23, name: 'Veggie Double Patty Burger', price: 80, description: 'Double patty veggie burger' }
    ],
    'Sandwiches': [
      { id: 24, name: 'Veg Sandwich', price: 25, description: 'Fresh vegetable sandwich' },
      { id: 25, name: 'Veg Cheese Sandwich', price: 35, description: 'Veggie sandwich with cheese' },
      { id: 26, name: 'Corn Sandwich', price: 40, description: 'Sweet corn sandwich' },
      { id: 27, name: 'Corn Cheese Sandwich', price: 50, description: 'Corn sandwich with cheese' }
    ],
    'Grilled Sandwiches': [
      { id: 28, name: 'Veg Grilled Sandwich', price: 30, description: 'Grilled vegetable sandwich' },
      { id: 29, name: 'Veg Cheese Grilled Sandwich', price: 40, description: 'Grilled veggie sandwich with cheese' },
      { id: 30, name: 'Corn Grilled Sandwich', price: 50, description: 'Grilled corn sandwich' },
      { id: 31, name: 'Corn Cheese Grilled Sandwich', price: 60, description: 'Grilled corn sandwich with cheese' }
    ]
  };
  
  const categories = Object.keys(menuData);
  const menuItems = Object.values(menuData).flat();
  const totalItems = menuItems.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    showToast.info('Menu editing is view-only in this demo');
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', description: '', price: '', category: '', image_url: '' });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: Object.keys(menuData).find(cat => menuData[cat].some(i => i.id === item.id)),
      image_url: ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    showToast.info('Menu editing is view-only in this demo');
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Menu Management ({totalItems} items)</h5>
        <div>
          <Button 
            variant={viewMode === 'category' ? 'primary' : 'outline-primary'} 
            size="sm" 
            className="me-2"
            onClick={() => setViewMode('category')}
          >
            <i className="fas fa-th-large me-1"></i>Category View
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'primary' : 'outline-primary'} 
            size="sm" 
            className="me-3"
            onClick={() => setViewMode('table')}
          >
            <i className="fas fa-table me-1"></i>Table View
          </Button>
          <Button onClick={() => setShowModal(true)}>
            <i className="fas fa-plus me-2"></i>Add Item
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {viewMode === 'category' ? (
          <Row className="g-4">
            {categories.map(category => {
              const categoryItems = menuData[category];
              return (
                <Col lg={4} key={category}>
                  <Card className="menu-category-card h-100 border-0 shadow-sm">
                    <Card.Header className="bg-primary text-white text-center py-3">
                      <h5 className="mb-0">{category} ({categoryItems.length})</h5>
                    </Card.Header>
                    <Card.Body className="p-3">
                      {categoryItems.map(item => (
                        <div key={item.id} className="menu-item mb-3 p-2 border rounded">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="mb-0">{item.name}</h6>
                            <span className="badge bg-secondary">₹{item.price}</span>
                          </div>
                          <p className="text-muted small mb-2">{item.description}</p>
                          <div className="d-flex gap-1">
                            <Button size="sm" variant="outline-primary" onClick={() => handleEdit(item)}>
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(item.id)}>
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id}>
                  <td className="fw-semibold">{item.name}</td>
                  <td><span className="badge bg-secondary">{Object.keys(menuData).find(cat => menuData[cat].some(i => i.id === item.id))}</span></td>
                  <td className="text-primary fw-bold">₹{item.price}</td>
                  <td className="small">{item.description}</td>
                  <td>
                    <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEdit(item)}>
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(item.id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image URL (Optional)</Form.Label>
                    <Form.Control
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit">{editingItem ? 'Update' : 'Add'} Item</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default MenuManagement;