import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { paymentAPI } from '../../services/api';
import { showToast } from '../Toast';

const PaymentGateway = ({ bookingData, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankAccount: ''
  });
  const [loading, setLoading] = useState(false);

  const amount = bookingData.amount || (bookingData.guests * 2000);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await paymentAPI.createPayment({
        booking_id: bookingData.id,
        amount: amount,
        payment_method: paymentMethod
      });

      onPaymentComplete();
    } catch (error) {
      showToast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <Alert variant="info" className="mb-4">
        <h6 className="mb-2">Booking Summary</h6>
        <div>Table {bookingData.table?.table_number} • {bookingData.guests} guests</div>
        <div>{new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}</div>
        <div className="mt-2"><strong>Amount: ₹{amount}</strong></div>
      </Alert>

      <Form onSubmit={handlePayment}>
        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="card"
              name="paymentMethod"
              label="💳 Card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <Form.Check
              type="radio"
              id="upi"
              name="paymentMethod"
              label="💸 UPI"
              checked={paymentMethod === 'upi'}
              onChange={() => setPaymentMethod('upi')}
            />
            <Form.Check
              type="radio"
              id="netbanking"
              name="paymentMethod"
              label="🏦 Net Banking"
              checked={paymentMethod === 'netbanking'}
              onChange={() => setPaymentMethod('netbanking')}
            />
          </div>
        </Form.Group>

        {paymentMethod === 'card' && (
          <div>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                required
              />
            </Form.Group>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <Form.Group className="mb-3">
            <Form.Label>UPI ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="yourname@upi"
              value={paymentDetails.upiId}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
              required
            />
          </Form.Group>
        )}

        {paymentMethod === 'netbanking' && (
          <Form.Group className="mb-3">
            <Form.Label>Select Bank</Form.Label>
            <Form.Select
              value={paymentDetails.bankAccount}
              onChange={(e) => handleInputChange('bankAccount', e.target.value)}
              required
            >
              <option value="">Choose your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </Form.Select>
          </Form.Group>
        )}

        <Button 
          type="submit" 
          size="lg" 
          className="w-100"
          disabled={loading}
        >
          {loading ? 'Processing Payment...' : `Pay ₹${amount}`}
        </Button>
      </Form>
    </div>
  );
};

export default PaymentGateway;