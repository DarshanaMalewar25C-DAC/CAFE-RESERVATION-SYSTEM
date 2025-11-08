import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { adminAPI, tableAPI } from '../../services/api';
import { showToast } from '../Toast';

const TableManagement = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [formData, setFormData] = useState({
    table_number: '',
    capacity: '',
    location: '',
    image_url: ''
  });

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const response = await tableAPI.getTables();
      setTables(response.data);
    } catch (error) {
      showToast.error('Error loading tables');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTable) {
        await adminAPI.updateTable(editingTable.id, formData);
        showToast.success('✅ Table Updated Successfully');
      } else {
        await adminAPI.addTable(formData);
        showToast.success('✅ Table Added Successfully');
      }
      setShowModal(false);
      setEditingTable(null);
      setFormData({ table_number: '', capacity: '', location: '', image_url: '' });
      loadTables();
    } catch (error) {
      showToast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleEdit = (table) => {
    setEditingTable(table);
    setFormData({
      table_number: table.table_number,
      capacity: table.capacity,
      location: table.location,
      image_url: table.image_url || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        await adminAPI.deleteTable(id);
        showToast.success('Table deleted successfully');
        loadTables();
      } catch (error) {
        showToast.error('Error deleting table');
      }
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Table Management</h5>
        <Button onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>Add Table
        </Button>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Table #</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(table => (
              <tr key={table.id}>
                <td>{table.table_number}</td>
                <td>{table.capacity} people</td>
                <td>{table.location}</td>
                <td>
                  <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEdit(table)}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(table.id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingTable ? 'Edit Table' : 'Add New Table'}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Table Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.table_number}
                      onChange={(e) => setFormData({...formData, table_number: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL (Optional)</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit">{editingTable ? 'Update' : 'Add'} Table</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default TableManagement;