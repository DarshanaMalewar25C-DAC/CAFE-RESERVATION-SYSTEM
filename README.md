# Cafe Reservation System

A complete mern stack table reservation system built with React, Node.js, Express, and MySQL.

## Features

- User registration and authentication (JWT)
- Table availability checking
- Booking creation and management
- Admin panel for booking management
- Image upload support (Google Cloud Storage)
- Responsive design with React Bootstrap

## Tech Stack

**Frontend:**
- React 18 with functional components and hooks
- React Router v6 for client-side routing
- React Bootstrap for UI components
- Axios for API calls
- Vite for development and building

**Backend:**
- Node.js with Express
- MySQL database with mysql2
- JWT authentication
- bcrypt for password hashing
- Google Cloud Storage for file uploads
- CORS enabled

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- Google Cloud Storage account (for image uploads)

### Database Setup
1. Create MySQL database:
```sql
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
- Database credentials
- JWT secret
- Google Cloud Storage settings

4. Start the server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Default Credentials

**Admin:**
- Email: admin@cafe.com
- Password: admin123

**User:**
- Email: john@example.com
- Password: user123

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Tables
- GET `/api/tables` - Get all tables
- GET `/api/tables/available` - Get available tables for date/time

### Bookings
- POST `/api/bookings` - Create booking (authenticated)
- GET `/api/bookings/user` - Get user bookings (authenticated)
- GET `/api/bookings/admin` - Get all bookings (admin only)
- PUT `/api/bookings/:id/status` - Update booking status (admin only)

### Upload
- POST `/api/upload/image` - Upload image to Google Cloud Storage (authenticated)

## Project Structure

```
cafe-reservation-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── index.html
└── database/
    ├── schema.sql
    └── seed.sql
```
