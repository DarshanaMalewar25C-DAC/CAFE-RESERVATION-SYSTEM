//This is strictly for ADMIN.
//Admin dashboard me saare analytics dikhane ke liye ye function use hota hai.


import pool from '../config/database.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Get total users
    const [userCount] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE role = "user"');
    
    // Get total reservations
    const [reservationCount] = await pool.execute('SELECT COUNT(*) as count FROM bookings');
    
    // Get reservation status breakdown
    const [reservationStatus] = await pool.execute(`
      SELECT 
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
      FROM bookings
    `);
    
    // Get table status
    const [tableStats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_tables,
        SUM(CASE WHEN b.id IS NOT NULL AND b.booking_date = CURDATE() 
          AND b.booking_time <= CURTIME() 
          AND b.end_time > CURTIME() 
          AND b.status = 'confirmed' THEN 1 ELSE 0 END) as reserved_tables
      FROM tables t
      LEFT JOIN bookings b ON t.id = b.table_id 
        AND b.booking_date = CURDATE() 
        AND b.booking_time <= CURTIME() 
        AND b.end_time > CURTIME()
        AND b.status = 'confirmed'
    `);
    
    // Get menu items count
    const [menuCount] = await pool.execute('SELECT COUNT(*) as count FROM menu_items');
    
    // Get payments summary
    const [paymentStats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_payments,
        SUM(amount) as total_amount,
        SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as completed_amount,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_payments
      FROM payments
    `);
    
    // Get recent feedback
    const [recentFeedback] = await pool.execute(`
      SELECT f.*, u.name as user_name 
      FROM feedback f 
      JOIN users u ON f.user_id = u.id 
      ORDER BY f.created_at DESC 
      LIMIT 5
    `);

    const stats = {
      totalUsers: userCount[0].count,
      totalReservations: reservationCount[0].count,
      approvedReservations: reservationStatus[0].approved || 0,
      pendingReservations: reservationStatus[0].pending || 0,
      cancelledReservations: reservationStatus[0].cancelled || 0,
      totalTables: tableStats[0].total_tables,
      reservedTables: tableStats[0].reserved_tables,
      availableTables: tableStats[0].total_tables - tableStats[0].reserved_tables,
      menuItemsCount: menuCount[0].count,
      totalPayments: paymentStats[0].total_payments || 0,
      totalAmount: paymentStats[0].total_amount || 0,
      completedAmount: paymentStats[0].completed_amount || 0,
      pendingPayments: paymentStats[0].pending_payments || 0,
      recentFeedback: recentFeedback
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*This function collects all important admin dashboard stats—users, bookings, tables, payments, menu items, and feedback—and returns them to the frontend.
*/