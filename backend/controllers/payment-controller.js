import pool from '../config/database.js';

export const createPayment = async (req, res) => {
  try {
    const { booking_id, amount, payment_method } = req.body;
    const transaction_id = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const [result] = await pool.execute(
      'INSERT INTO payments (booking_id, amount, payment_method, transaction_id) VALUES (?, ?, ?, ?)',
      [booking_id, amount, payment_method, transaction_id]
    );
    
    res.status(201).json({ 
      message: 'Payment created successfully', 
      payment_id: result.insertId,
      transaction_id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await pool.execute(
      'UPDATE payments SET status = ? WHERE id = ?',
      [status, id]
    );
    
    res.json({ message: 'Payment status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//admin will gate all payments
export const getAllPayments = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT p.*, b.booking_date, b.booking_time, u.name as user_name, t.table_number
      FROM payments p
      JOIN bookings b ON p.booking_id = b.id
      JOIN users u ON b.user_id = u.id
      JOIN tables t ON b.table_id = t.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPayments = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await pool.execute(`
      SELECT p.*, b.booking_date, b.booking_time, t.table_number
      FROM payments p
      JOIN bookings b ON p.booking_id = b.id
      JOIN tables t ON b.table_id = t.id
      WHERE b.user_id = ?
      ORDER BY p.created_at DESC
    `, [user_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//No real payment happens. It just saves payment data in the database and pretends like a payment exists