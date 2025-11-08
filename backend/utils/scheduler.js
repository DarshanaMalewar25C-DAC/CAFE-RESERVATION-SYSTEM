import pool from '../config/database.js';

// Check and release expired bookings every 15 minutes
export const releaseExpiredBookings = async () => {
  try {
    const [result] = await pool.execute(`
      UPDATE bookings 
      SET status = 'completed' 
      WHERE status = 'confirmed' 
      AND CONCAT(booking_date, ' ', end_time) < NOW()
    `);
    
    if (result.affectedRows > 0) {
      console.log(`Released ${result.affectedRows} expired table bookings`);
    }
  } catch (error) {
    console.error('Error releasing expired bookings:', error);
  }
};

export const startScheduler = () => {
  setInterval(releaseExpiredBookings, 15 * 60 * 1000); // 15 minutes
  console.log('Table release scheduler started');
};