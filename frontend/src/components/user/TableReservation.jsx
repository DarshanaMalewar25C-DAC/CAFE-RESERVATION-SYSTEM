import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { bookingAPI } from '../../services/api';
import { showToast } from '../Toast';
import PaymentGateway from './PaymentGateway';
import { formatTo12Hour } from '../../utils/timeUtils';

const TableReservation = ({ selectedTable, selectedDate, startTime, onReservationComplete }) => {
  const [guests, setGuests] = useState(2);
  const [customEndTime, setCustomEndTime] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReservation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await bookingAPI.createBooking({
        tableId: selectedTable.id,
        date: selectedDate,
        startTime: startTime,
        endTime: customEndTime,
        guests
      });

      setBookingData({
        ...response.data,
        table: selectedTable,
        date: selectedDate,
        startTime: startTime,
        endTime: customEndTime,
        guests
      });
      
      setShowPayment(true);
      showToast.success('🕒 Table Reserved Successfully!');
    } catch (error) {
      showToast.error(error.response?.data?.error || 'Reservation failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    onReservationComplete && onReservationComplete();
    showToast.success('💳 Payment Completed Successfully!');
  };

  if (!selectedTable) {
    return (
      <Card>
        <Card.Body className="text-center text-muted py-5">
          <i className="fas fa-table fa-3x mb-3"></i>
          <h5>Select a table to make a reservation</h5>
          <p>Choose an available table from the list above</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Card.Header>
          <h5 className="mb-0">
            <i className="fas fa-calendar-plus me-2"></i>
            Table Reservation
          </h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleReservation}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Selected Table</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={`Table ${selectedTable.table_number} (${selectedTable.capacity} people)`}
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedTable.location}
                    readOnly 
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={new Date(selectedDate).toLocaleDateString()}
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={formatTo12Hour(startTime)}
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={customEndTime}
                    onChange={(e) => setCustomEndTime(e.target.value)}
                    min={startTime}
                    max="23:59"
                    required
                  />
                  <Form.Text className="text-muted">
                    Choose your preferred end time (can be more than 2 hours)
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-4">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max={selectedTable.capacity}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                required
              />
              <Form.Text className="text-muted">
                Maximum capacity: {selectedTable.capacity} people
              </Form.Text>
            </Form.Group>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Reserve Table'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showPayment} onHide={() => setShowPayment(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Complete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingData && (
            <PaymentGateway 
              bookingData={bookingData}
              onPaymentComplete={handlePaymentComplete}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TableReservation;