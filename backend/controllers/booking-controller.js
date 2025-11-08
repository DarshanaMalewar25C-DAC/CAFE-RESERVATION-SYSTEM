import pool from '../config/database.js';

export const createBooking = async (req, res) => {
  try {
    const { tableId, date, startTime, endTime, guests } = req.body;
    const userId = req.user.id;
    
    if (!startTime || !endTime) {
      return res.status(400).json({ error: 'Start time and end time are required' });
    }
    
    // Check if table is available for the time range
    const [existing] = await pool.execute(
      `SELECT id FROM bookings 
       WHERE table_id = ? AND booking_date = ? 
       AND status IN ('confirmed', 'pending')
       AND NOT (end_time <= ? OR booking_time >= ?)`,
      [tableId, date, startTime, endTime]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Table is not available for this time slot' });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO bookings (user_id, table_id, booking_date, booking_time, end_time, guests) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, tableId, date, startTime, endTime, guests]
    );
    
    // Create payment record
    const amount = guests * 600.00; // ₹600 per person
    await pool.execute(
      'INSERT INTO payments (booking_id, amount, status) VALUES (?, ?, "pending")',
      [result.insertId, amount]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Booking created successfully', amount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//status 201 - server ne successfully koi nayi cheez create kar di ho.
//status 400 - ser ne galat data ya incomplete data send kiya ho.

//FOR USER
//This function returns all bookings of the logged-in user, including table details, sorted by latest first.
//status 500 - galti server ke andar hoti hai
export const getUserBookings = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT b.*, t.table_number, t.capacity 
       FROM bookings b 
       JOIN tables t ON b.table_id = t.id 
       WHERE b.user_id = ? 
       ORDER BY b.booking_date DESC, b.booking_time DESC`,
      [req.user.id]
    );
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//FOR ADMIN
//This is for ADMIN.
//Because admin ko saare users ki bookings dekhne hoti hain.
export const getAllBookings = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT b.*, u.name as user_name, u.email, t.table_number 
       FROM bookings b 
       JOIN users u ON b.user_id = u.id 
       JOIN tables t ON b.table_id = t.id 
       ORDER BY b.booking_date DESC, b.booking_time DESC`
    );
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await pool.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, id]
    );
    
    // If confirmed, update payment status
    if (status === 'confirmed') {
      await pool.execute(
        'UPDATE payments SET status = "completed" WHERE booking_id = ?',
        [id]
      );
    }
    
    res.json({ message: 'Booking status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM bookings WHERE id = ?', [id]);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkTableAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;
    
    const [tables] = await pool.execute(
      `SELECT t.*, 
       CASE WHEN b.id IS NULL THEN 'available' ELSE 'reserved' END as status
       FROM tables t
       LEFT JOIN bookings b ON t.id = b.table_id 
       AND b.booking_date = ? 
       AND b.status IN ('confirmed', 'pending')
       AND NOT (b.end_time <= ? OR b.booking_time >= ?)
       ORDER BY t.table_number`,
      [date, startTime, endTime]
    );
    
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};