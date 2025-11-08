import bcrypt from 'bcrypt';       //Used to hash passwords (convert to unreadable form).
import jwt from 'jsonwebtoken';   //Used to generate a token so user stays logged in.
import pool from '../config/database.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, adminToken } = req.body;   //Frontend sends these values in form.
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    
    // Check if user already exists
    const [existingUser] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    //Before saving password → convert to secure hashed form.
    //No real password is stored — only hashed version.
    const hashedPassword = await bcrypt.hash(password, 10);

    //By default → every signup = normal user
    let role = 'user';
    let admin_token = null;
    let user_token = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Check admin token
    //If they provide correct admin token → role = admin
    //Else → reject
    if (adminToken) {
      if (adminToken === 'ADMIN2024') {
        role = 'admin';
        admin_token = adminToken;
        user_token = null;
      } else {
        return res.status(400).json({ error: 'Invalid admin token' });
      }
    }
    
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, phone, role, admin_token, user_token) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone || null, role, admin_token, user_token]
    );
    
    res.status(201).json({ 
      message: role === 'admin' ? 'Admin registered successfully' : 'User registered successfully',
      role 
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'User already exists with this email' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};


//LOGIN FUNCTION STARTS

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0]; //The query returns an array of users.Since email is unique, we take the first user.
    const validPassword = await bcrypt.compare(password, user.password);
    /*password → user typed
    user.password → hashed password from database
    bcrypt.compare checks if both match.
  */

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    /*
    What the token contains:
        user id
        email
        role (admin/user)

    Why token?
    To keep the user logged in
    To access protected backend routes(like booking a table, admin operations)

    Valid for:
    24 hours
*/

    res.json({
      token,        //token → store in localStorage
      user: {       //user details → show on UI (name, email, role)
        id: user.id, 
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//This code verifies the password, creates a login token, and sends the token + user info back to the frontend.