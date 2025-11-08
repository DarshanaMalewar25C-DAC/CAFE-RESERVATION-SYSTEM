//Ye component admin dashboard ke liye overall stats show karta hai, jaise total users, bookings, payments, etc.

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { adminAPI } from '../../services/api';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReservations: 0,
    approvedReservations: 0,
    pendingReservations: 0,
    cancelledReservations: 0,
    totalTables: 0,
    reservedTables: 0,
    availableTables: 0,
    menuItemsCount: 0,
    totalPayments: 0,
    totalAmount: 0.0,
    completedAmount: 0.0,
    pendingPayments: 0,
    recentFeedback: []
  });

  /*
  Page load hote hi loadDashboardStats() call hota hai
  Interval setup → dashboard stats har 30 seconds refresh hote hain
  Component unmount hone par interval clear ho jaata hai
  Flow: Component render → API call → state update → UI update
*/

  useEffect(() => {
    loadDashboardStats();
    const interval = setInterval(loadDashboardStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  /*
 API call → backend getDashboardStats() endpoint se data fetch
 Response data → stats state me set
 totalAmount aur completedAmount ensure karte hai ki float number ho
 Agar error → console me log hota hai
 Data Flow: Backend → API → frontend state → UI
*/

  const loadDashboardStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      const data = response.data;
      setStats({
        ...data,
        totalAmount: parseFloat(data.totalAmount || 0),
        completedAmount: parseFloat(data.completedAmount || 0)
      });
    } catch (error) {
      console.error('Error loading dashboard stats');
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className={`text-${color} me-3`}>
            <i className={`${icon} fa-2x`}></i>
          </div>
          <div>
            <h3 className="mb-0">{value}</h3>
            <p className="text-muted mb-0">{title}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <h4 className="mb-4">Dashboard Overview</h4>
      
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="fas fa-users" 
            color="primary" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Tables" 
            value={stats.totalTables} 
            icon="fas fa-table" 
            color="info" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Available Tables" 
            value={`${stats.availableTables}/${stats.totalTables}`} 
            icon="fas fa-check-circle" 
            color="success" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Reserved Tables" 
            value={stats.reservedTables} 
            icon="fas fa-clock" 
            color="danger" 
          />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Reservations" 
            value={stats.totalReservations} 
            icon="fas fa-calendar-check" 
            color="primary" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Approved" 
            value={stats.approvedReservations} 
            icon="fas fa-thumbs-up" 
            color="success" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Pending" 
            value={stats.pendingReservations} 
            icon="fas fa-hourglass-half" 
            color="warning" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Menu Items" 
            value={stats.menuItemsCount} 
            icon="fas fa-utensils" 
            color="info" 
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                <i className="fas fa-credit-card me-2"></i>
                Payments Summary
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Total Payments:</strong> {stats.totalPayments}
              </div>
              <div className="mb-2">
                <strong>Total Amount:</strong> ₹{(stats.totalAmount || 0).toFixed(2)}
              </div>
              <div className="mb-2">
                <strong>Completed Amount:</strong> ₹{(stats.completedAmount || 0).toFixed(2)}
              </div>
              <div>
                <strong>Pending Payments:</strong> {stats.pendingPayments}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                <i className="fas fa-comments me-2"></i>
                Recent Feedback
              </h6>
            </Card.Header>
            <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {stats.recentFeedback.length === 0 ? (
                <p className="text-muted">No feedback yet</p>
              ) : (
                stats.recentFeedback.map(feedback => (
                  <div key={feedback.id} className="mb-2 pb-2 border-bottom">
                    <div className="d-flex justify-content-between">
                      <strong>{feedback.user_name}</strong>
                      <div>
                        {[...Array(feedback.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-warning"></i>
                        ))}
                      </div>
                    </div>
                    <small className="text-muted">{feedback.comment}</small>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;