import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Row, Col, Form } from 'react-bootstrap';
import { adminAPI, bookingAPI, paymentAPI, feedbackAPI } from '../../services/api';
import { showToast } from '../Toast';

const DataReports = () => {
  const [reportType, setReportType] = useState('reservations');
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadReportData();
  }, [reportType]);

  const loadReportData = async () => {
    try {
      let response;
      switch (reportType) {
        case 'reservations':
          response = await bookingAPI.getAllBookings();
          break;
        case 'payments':
          response = await paymentAPI.getAllPayments();
          break;
        case 'feedback':
          response = await feedbackAPI.getAllFeedback();
          break;
        default:
          response = { data: [] };
      }
      setData(response.data);
    } catch (error) {
      showToast.error('Error loading report data');
    }
  };

  const exportData = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report.csv`;
    a.click();
    showToast.success('Report exported successfully');
  };

  const generateCSV = () => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  };

  const renderTable = () => {
    if (data.length === 0) return <p>No data available</p>;

    switch (reportType) {
      case 'reservations':
        return (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Table</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user_name}</td>
                  <td>Table {item.table_number}</td>
                  <td>{new Date(item.booking_date).toLocaleDateString()}</td>
                  <td>{item.booking_time}</td>
                  <td>{item.guests}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'payments':
        return (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user_name}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'feedback':
        return (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user_name}</td>
                  <td>{item.rating}/5</td>
                  <td>{item.comment}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5 className="mb-0">
              <i className="fas fa-chart-bar me-2"></i>
              Data Reports
            </h5>
          </Col>
          <Col xs="auto">
            <Button onClick={exportData} variant="success">
              <i className="fas fa-download me-2"></i>
              Export CSV
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Report Type</Form.Label>
              <Form.Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="reservations">Reservations</option>
                <option value="payments">Payments</option>
                <option value="feedback">Feedback</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {renderTable()}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DataReports;