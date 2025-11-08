import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { tableAPI } from '../../services/api';
import { showToast } from '../Toast';

const AvailableTables = ({ onTableSelect }) => {
  const [tables, setTables] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    loadAllTables();
  }, []);

  const loadAllTables = async () => {
    try {
      const response = await tableAPI.getTables();
      setTables(response.data);
    } catch (error) {
      showToast.error('Error loading tables');
    }
  };

  const checkAvailability = async () => {
    if (!selectedDate || !selectedTime) {
      showToast.error('Please select date and time');
      return;
    }

    try {
      const response = await tableAPI.getAvailableTables(selectedDate, selectedTime);
      setAvailableTables(response.data);
      
      if (response.data.length === 0) {
        showToast.warning('🚫 No tables available for selected time slot');
      } else {
        showToast.success(`Found ${response.data.length} available tables`);
      }
    } catch (error) {
      showToast.error('Error checking availability');
    }
  };

  const getTableStatus = (tableId) => {
    return availableTables.some(t => t.id === tableId) ? 'Available' : 'Reserved';
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="fas fa-table me-2"></i>
          Available Tables
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                min="10:00"
                max="22:00"
              />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button onClick={checkAvailability} className="w-100">
              <i className="fas fa-search me-2"></i>
              Check Availability
            </Button>
          </Col>
        </Row>

        <Row>
          {tables.map(table => {
            const isAvailable = selectedDate && selectedTime ? 
              availableTables.some(t => t.id === table.id) : null;
            
            return (
              <Col md={6} lg={4} key={table.id} className="mb-3">
                <Card className={`h-100 ${isAvailable === true ? 'border-success' : isAvailable === false ? 'border-danger' : ''}`}>
                  <Card.Body className="text-center">
                    <Card.Title>Table {table.table_number}</Card.Title>
                    <Card.Text>
                      <i className="fas fa-users me-2"></i>
                      Capacity: {table.capacity} people
                      <br />
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Location: {table.location}
                    </Card.Text>
                    
                    {selectedDate && selectedTime && (
                      <Badge 
                        bg={isAvailable ? 'success' : 'danger'} 
                        className="mb-2"
                      >
                        {isAvailable ? 'Available' : 'Reserved'}
                      </Badge>
                    )}
                    
                    {isAvailable && onTableSelect && (
                      <Button 
                        className="w-100"
                        onClick={() => onTableSelect(table, selectedDate, selectedTime)}
                      >
                        <i className="fas fa-calendar-check me-2"></i>
                        Select Table
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AvailableTables;