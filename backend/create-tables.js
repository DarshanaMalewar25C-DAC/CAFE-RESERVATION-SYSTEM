import pool from './config/database.js';

async function createTables() {
  try {
    // Add new columns to users table
    try {
      await pool.execute('ALTER TABLE users ADD COLUMN admin_token VARCHAR(255)');
      console.log('Added admin_token column');
    } catch (error) {
      if (!error.message.includes('Duplicate column')) {
        console.log('admin_token column already exists or error:', error.message);
      }
    }

    try {
      await pool.execute('ALTER TABLE users ADD COLUMN user_token VARCHAR(255)');
      console.log('Added user_token column');
    } catch (error) {
      if (!error.message.includes('Duplicate column')) {
        console.log('user_token column already exists or error:', error.message);
      }
    }

    // Create menu_items table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(255),
        category VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created menu_items table');

    // Create feedback table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        booking_id INT,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
      )
    `);
    console.log('Created feedback table');

    // Create payments table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        booking_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        payment_method VARCHAR(50),
        transaction_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
      )
    `);
    console.log('Created payments table');

    // Insert sample menu items
    const menuItems = [
      ['Espresso', 'Rich, bold shot of premium coffee', 2.50, 'Beverages'],
      ['Cappuccino', 'Espresso with steamed milk foam', 3.75, 'Beverages'],
      ['Avocado Toast', 'Fresh avocado on artisan bread', 8.95, 'Food'],
      ['Caesar Salad', 'Crisp romaine with parmesan', 9.50, 'Food'],
      ['Chocolate Cake', 'Rich chocolate layer cake', 5.95, 'Desserts']
    ];

    for (const [name, description, price, category] of menuItems) {
      try {
        await pool.execute(
          'INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)',
          [name, description, price, category]
        );
      } catch (error) {
        if (!error.message.includes('Duplicate entry')) {
          console.error('Error inserting menu item:', error.message);
        }
      }
    }
    console.log('Inserted sample menu items');

    // Update admin user with token
    try {
      await pool.execute(
        'UPDATE users SET admin_token = ? WHERE email = ?',
        ['ADMIN2024', 'admin@cafe.com']
      );
      console.log('Updated admin user with token');
    } catch (error) {
      console.error('Error updating admin user:', error.message);
    }

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error.message);
    process.exit(1);
  }
}

createTables();