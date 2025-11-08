import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Form, Row, Col } from 'react-bootstrap';
import { bookingAPI, adminAPI } from '../../services/api';
import { showToast } from '../Toast';
import { formatTo12Hour } from '../../utils/timeUtils';

const ReservationManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    status: '',
    tableNumber: ''
  });

  useEffect(() => {
    loadBookings();
    const interval = setInterval(loadBookings, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [bookings, filters]);

  useEffect(() => {
    return () => {
      // Cleanup interval on unmount
    };
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getAllBookings();
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      showToast.error('Error loading bookings');
    }
  };
  
  const applyFilters = () => {
    let filtered = bookings;
    
    if (filters.date) {
      filtered = filtered.filter(booking => 
        booking.booking_date.includes(filters.date)
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(booking => 
        booking.status === filters.status
      );
    }
    
    if (filters.tableNumber) {
      filtered = filtered.filter(booking => 
        booking.table_number.toString().includes(filters.tableNumber)
      );
    }
    
    setFilteredBookings(filtered);
  };
  
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await bookingAPI.updateBookingStatus(id, status);
      if (status === 'confirmed') {
        showToast.success('🕒 Reservation Approved');
      } else if (status === 'cancelled') {
        showToast.success('🕒 Reservation Rejected');
      }
      loadBookings();
    } catch (error) {
      showToast.error('Error updating booking status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await adminAPI.deleteBooking(id);
        showToast.success('Booking deleted successfully');
        loadBookings();
      } catch (error) {
        showToast.error('Error deleting booking');
      }
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const isExpired = (date, time) => {
    const bookingDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    return bookingDateTime < now;
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Reservation Management</h5>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Filter by Date</Form.Label>
              <Form.Control
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Filter by Table</Form.Label>
              <Form.Control
                type="text"
                placeholder="Table number"
                value={filters.tableNumber}
                onChange={(e) => handleFilterChange('tableNumber', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button 
              variant="outline-secondary" 
              onClick={() => setFilters({ date: '', status: '', tableNumber: '' })}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Table</th>
              <th>Date</th>
              <th>Time Range</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id} className={isExpired(booking.booking_date, booking.booking_time) ? 'table-secondary' : ''}>
                <td>
                  <div>
                    <strong>{booking.user_name}</strong>
                    <br />
                    <small className="text-muted">{booking.email}</small>
                  </div>
                </td>
                <td>Table {booking.table_number}</td>
                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td>{formatTo12Hour(booking.booking_time)} - {formatTo12Hour(booking.end_time) || 'N/A'}</td>
                <td>{booking.guests}</td>
                <td>
                  <Badge bg={getStatusVariant(booking.status)}>
                    {booking.status}
                  </Badge>
                  {isExpired(booking.booking_date, booking.booking_time) && (
                    <Badge bg="secondary" className="ms-1">Expired</Badge>
                  )}
                </td>
                <td>
                  {booking.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="success" 
                        className="me-2"
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                      >
                        <i className="fas fa-check"></i> Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        className="me-2"
                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                      >
                        <i className="fas fa-times"></i> Reject
                      </Button>
                    </>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline-danger"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ReservationManagement;