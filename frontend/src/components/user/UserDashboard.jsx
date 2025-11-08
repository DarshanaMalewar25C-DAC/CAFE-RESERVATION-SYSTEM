import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { bookingAPI, paymentAPI, feedbackAPI } from '../../services/api';
import { showToast } from '../Toast';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    upcomingReservations: [],
    recentFeedback: [],
    lastPayment: null
  });

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const [bookingsRes, paymentsRes, feedbackRes] = await Promise.all([
        bookingAPI.getUserBookings(),
        paymentAPI.getUserPayments(),
        feedbackAPI.getUserFeedback()
      ]);

      const upcoming = bookingsRes.data.filter(booking => 
        new Date(`${booking.booking_date} ${booking.booking_time}`) > new Date()
      ).slice(0, 3);

      setStats({
        upcomingReservations: upcoming,
        recentFeedback: feedbackRes.data.slice(0, 2),
        lastPayment: paymentsRes.data[0] || null
      });
    } catch (error) {
      console.error('Error loading user stats');
    }
  };

  const handleLogout = () => {
    logout();
    showToast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-1">👋 Welcome back, {user?.name}!</h3>
              <p className="text-muted">Here's your café activity overview</p>
            </div>
            <Button variant="outline-danger" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">
              <h6 className="mb-0">
                <i className="fas fa-calendar-alt me-2"></i>
                Upcoming Reservations
              </h6>
            </Card.Header>
            <Card.Body>
              {stats.upcomingReservations.length === 0 ? (
                <p className="text-muted">No upcoming reservations</p>
              ) : (
                stats.upcomingReservations.map(booking => (
                  <div key={booking.id} className="mb-2 pb-2 border-bottom">
                    <strong>Table {booking.table_number}</strong>
                    <br />
                    <small className="text-muted">
                      {new Date(booking.booking_date).toLocaleDateString()} at {booking.booking_time}
                    </small>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Header className="bg-success text-white">
              <h6 className="mb-0">
                <i className="fas fa-comments me-2"></i>
                Recent Feedback
              </h6>
            </Card.Header>
            <Card.Body>
              {stats.recentFeedback.length === 0 ? (
                <p className="text-muted">No feedback submitted yet</p>
              ) : (
                stats.recentFeedback.map(feedback => (
                  <div key={feedback.id} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>
                        {[...Array(feedback.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-warning"></i>
                        ))}
                      </span>
                      <small className="text-muted">
                        {new Date(feedback.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Header className="bg-info text-white">
              <h6 className="mb-0">
                <i className="fas fa-credit-card me-2"></i>
                Last Payment
              </h6>
            </Card.Header>
            <Card.Body>
              {!stats.lastPayment ? (
                <p className="text-muted">No payments yet</p>
              ) : (
                <div>
                  <strong>₹{stats.lastPayment.amount}</strong>
                  <br />
                  <small className="text-muted">
                    Status: {stats.lastPayment.status}
                    <br />
                    {new Date(stats.lastPayment.created_at).toLocaleDateString()}
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;