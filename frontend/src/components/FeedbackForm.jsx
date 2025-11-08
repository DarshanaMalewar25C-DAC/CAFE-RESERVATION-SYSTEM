import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { feedbackAPI, bookingAPI } from '../services/api';
import { showToast } from './Toast';

const FeedbackForm = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [formData, setFormData] = useState({
    booking_id: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      // Only show confirmed bookings
      const confirmedBookings = response.data.filter(booking => booking.status === 'confirmed');
      setUserBookings(confirmedBookings);
    } catch (error) {
      console.error('Error loading bookings');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await feedbackAPI.submitFeedback(formData);
      showToast.success('📨 Feedback Submitted Successfully!');
      setFormData({ booking_id: '', rating: 5, comment: '' });
    } catch (error) {
      showToast.error('Error submitting feedback');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="fas fa-comment me-2"></i>
          Submit Feedback
        </h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Booking (Optional)</Form.Label>
                <Form.Select
                  name="booking_id"
                  value={formData.booking_id}
                  onChange={handleChange}
                >
                  <option value="">General Feedback</option>
                  {userBookings.map(booking => (
                    <option key={booking.id} value={booking.id}>
                      Table {booking.table_number} - {new Date(booking.booking_date).toLocaleDateString()}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Very Good</option>
                  <option value={3}>⭐⭐⭐ Good</option>
                  <option value={2}>⭐⭐ Fair</option>
                  <option value={1}>⭐ Poor</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Share your experience with us..."
              required
            />
          </Form.Group>
          
          <Button type="submit" className="w-100">
            <i className="fas fa-paper-plane me-2"></i>
            Submit Feedback
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FeedbackForm;