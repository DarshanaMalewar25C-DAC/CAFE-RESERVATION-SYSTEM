import pool from '../config/database.js';

export const getTables = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tables ORDER BY table_number');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//user will se the available table toh wo book kar sakta hai
export const getAvailableTables = async (req, res) => {
  try {
    const { date, time } = req.query;
    
    console.log('Checking availability for:', { date, time });
    
    if (!date || !time) {
      return res.status(400).json({ error: 'Date and time are required' });
    }
    
    const [rows] = await pool.execute(
      `SELECT t.* FROM tables t 
       WHERE t.id NOT IN (
         SELECT b.table_id FROM bookings b 
         WHERE b.booking_date = ? AND b.booking_time = ? AND b.status IN ('confirmed', 'pending')
       ) ORDER BY t.table_number`,
      [date, time]
    );
    
    console.log('Available tables found:', rows.length);
    res.json(rows);
  } catch (error) {
    console.error('Error in getAvailableTables:', error);
    res.status(500).json({ error: error.message });
  }
};

export const addTable = async (req, res) => {
  try {
    const { table_number, capacity, location, image_url } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO tables (table_number, capacity, location, image_url) VALUES (?, ?, ?, ?)',
      [table_number, capacity, location, image_url]
    );
    
    res.status(201).json({ message: 'Table added successfully', id: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Table number already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { table_number, capacity, location, image_url } = req.body;
    
    await pool.execute(
      'UPDATE tables SET table_number = ?, capacity = ?, location = ?, image_url = ? WHERE id = ?',
      [table_number, capacity, location, image_url, id]
    );
    
    res.json({ message: 'Table updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM tables WHERE id = ?', [id]);
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTableStatus = async (req, res) => {
  try {
    const { date, time } = req.query;
    const checkDate = date || new Date().toISOString().split('T')[0];
    const checkTime = time || new Date().toTimeString().split(' ')[0].substring(0, 5);
    
    const [tableStatus] = await pool.execute(`
      SELECT 
        t.*,
        b.id as booking_id,
        b.booking_date,
        b.booking_time,
        b.end_time,
        b.status as booking_status,
        u.name as customer_name,
        CASE 
          WHEN b.id IS NOT NULL THEN 'reserved'
          ELSE 'available'
        END as status
      FROM tables t
      LEFT JOIN bookings b ON t.id = b.table_id 
        AND b.booking_date = ?
        AND b.status IN ('confirmed', 'pending')
        AND b.booking_time <= ? 
        AND b.end_time > ?
      LEFT JOIN users u ON b.user_id = u.id
      ORDER BY t.table_number
    `, [checkDate, checkTime, checkTime]);
    
    res.json(tableStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};