import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { feedbackAPI } from '../../services/api';
import { showToast } from '../Toast';

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    loadFeedback();
    const interval = setInterval(loadFeedback, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadFeedback = async () => {
    try {
      const response = await feedbackAPI.getAllFeedback();
      setFeedback(response.data);
    } catch (error) {
      showToast.error('Error loading feedback');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
      ></i>
    ));
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="fas fa-comments me-2"></i>
          Feedback Management
        </h5>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Booking</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map(item => (
              <tr key={item.id}>
                <td>{item.user_name}</td>
                <td>
                  {item.booking_id ? (
                    <Badge bg="info">
                      {new Date(item.booking_date).toLocaleDateString()}
                    </Badge>
                  ) : (
                    <Badge bg="secondary">General</Badge>
                  )}
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    {renderStars(item.rating)}
                    <span className="ms-2">({item.rating}/5)</span>
                  </div>
                </td>
                <td>
                  <div style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
                    {item.comment}
                  </div>
                </td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {feedback.length === 0 && (
          <div className="text-center text-muted py-4">
            No feedback submissions yet
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FeedbackManagement;