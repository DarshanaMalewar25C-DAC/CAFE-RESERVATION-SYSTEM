import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    // Connect without database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
    });

    console.log('Connected to MySQL server');
    
    // Create database if not exists
    await connection.execute('CREATE DATABASE IF NOT EXISTS table_booking');
    await connection.execute('USE table_booking');
    console.log('Database selected');

    // Read and execute schema
    const schemaPath = path.join(process.cwd(), '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const statements = schema.split(';').filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'));
    
    for (const statement of statements) {
      const cleanStatement = statement.trim();
      if (cleanStatement && !cleanStatement.startsWith('USE')) {
        try {
          await connection.execute(cleanStatement);
        } catch (error) {
          if (!error.message.includes('already exists')) {
            console.error('Error executing:', cleanStatement);
            throw error;
          }
        }
      }
    }

    console.log('Database schema created successfully');

    // Read and execute seed data
    const seedPath = path.join(process.cwd(), '..', 'database', 'seed.sql');
    const seedData = fs.readFileSync(seedPath, 'utf8');
    
    const seedStatements = seedData.split(';').filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'));
    
    for (const statement of seedStatements) {
      const cleanStatement = statement.trim();
      if (cleanStatement && !cleanStatement.startsWith('USE')) {
        try {
          await connection.execute(cleanStatement);
        } catch (error) {
          if (!error.message.includes('Duplicate entry')) {
            console.error('Error executing:', cleanStatement);
            throw error;
          }
        }
      }
    }

    console.log('Seed data inserted successfully');
    
    await connection.end();
    console.log('Database setup completed!');
    
  } catch (error) {
    console.error('Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();