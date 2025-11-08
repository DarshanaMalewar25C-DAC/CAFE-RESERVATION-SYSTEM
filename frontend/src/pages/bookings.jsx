import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Alert } from 'react-bootstrap';
import { bookingAPI } from '../services/api';
import { showToast } from '../components/Toast';
import { formatTo12Hour } from '../utils/timeUtils';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data);
      if (response.data.length === 0) {
        showToast.info('No bookings found');
      }
    } catch (error) {
      showToast.error('Error loading bookings');
      setMessage('Error loading bookings');
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

  return (
    <Container className="mt-4">
      <h1>My Bookings</h1>
      
      {message && <Alert variant="info">{message}</Alert>}
      
      {bookings.length === 0 ? (
        <Alert variant="info">No bookings found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Table</th>
              <th>Date</th>
              <th>Time Range</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>Table {booking.table_number}</td>
                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td>{formatTo12Hour(booking.booking_time)} - {formatTo12Hour(booking.end_time) || 'N/A'}</td>
                <td>{booking.guests}</td>
                <td>
                  <Badge bg={getStatusVariant(booking.status)}>
                    {booking.status}
                  </Badge>
                </td>
                <td>{new Date(booking.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Bookings;