import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  //FLOW
  //1. Frontend jab koi protected request bhejta hai, wo header me token bhejta hai:(Authorization: Bearer eyJhbGciOi...)

  //Backend is token ko nikaalta hai:
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  //Agar token hi nahi mila: Matlab: “Login karke aao.”
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  //Ab backend token verify karta hai:Token valid → OK Token invalid/expired → reject
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    //Agar token sahi mil gaya, to backend request me user ko attach kar deta hai:
    req.user = user; 
    next(); //Fir next() call hota hai aur route aage chal jata hai.
  });
};

//status 403 - The server understood your request but refuses to allow it. You are not logged in / not authorized,Missing or wrong token,Role not allowed.

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    console.error('Admin access denied for user:', req.user?.email || 'unknown');
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

/*
authenticateToken: “User login hai kya? Token sahi hai kya? Agar haan, aage jao.”
requireAdmin: “Admin ho tabhi ye route access kar sakte ho.”
*/