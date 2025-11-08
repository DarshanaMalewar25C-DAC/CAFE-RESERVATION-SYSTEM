import pool from '../config/database.js';


//USER FEEDBACK SUBMISSION
export const submitFeedback = async (req, res) => {
  try {
    const { booking_id, rating, comment } = req.body;
    const user_id = req.user.id;
    
    const [result] = await pool.execute(
      'INSERT INTO feedback (user_id, booking_id, rating, comment) VALUES (?, ?, ?, ?)',
      [user_id, booking_id, rating, comment]
    );
    
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//ADMIN RECEIVES THE FEEDBACK
export const getAllFeedback = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT f.*, u.name as user_name, b.booking_date, b.booking_time 
      FROM feedback f 
      JOIN users u ON f.user_id = u.id 
      LEFT JOIN bookings b ON f.booking_id = b.id 
      ORDER BY f.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserFeedback = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await pool.execute(
      'SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};