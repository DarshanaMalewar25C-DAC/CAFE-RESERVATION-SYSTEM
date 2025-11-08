import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

//dotenv
//This loads your .env file so you can safely store sensitive details like:
//database host
//username
//password
//database name



//export default pool;
/*Tumne is file me MySQL ka connection banaya.
Ab tum chahte ho ki controllers, routes, ya koi bhi backend file us connection ko use kare.
Uske liye tum connection ko export karte ho.
*/