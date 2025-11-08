import React, { useState, useEffect } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { paymentAPI } from '../../services/api';
import { showToast } from '../Toast';

const PaymentMonitoring = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
    const interval = setInterval(loadPayments, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadPayments = async () => {
    try {
      const response = await paymentAPI.getAllPayments();
      setPayments(response.data);
    } catch (error) {
      showToast.error('Error loading payments');
    }
  };



  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Payment Monitoring</h5>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer</th>
              <th>Table</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>
                  <small className="font-monospace">{payment.transaction_id || 'N/A'}</small>
                </td>
                <td>{payment.user_name}</td>
                <td>Table {payment.table_number}</td>
                <td>{new Date(payment.booking_date).toLocaleDateString()}</td>
                <td>₹{payment.amount}</td>
                <td>
                  <Badge bg={getStatusVariant(payment.status)}>
                    {payment.status}
                  </Badge>
                </td>
                <td>
                  <Badge bg="secondary">View Only</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>


      </Card.Body>
    </Card>
  );
};

export default PaymentMonitoring;