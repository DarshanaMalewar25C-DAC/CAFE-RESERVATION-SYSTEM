import express from 'express';
import { createBooking, getUserBookings, getAllBookings, updateBookingStatus, deleteBooking } from '../controllers/booking-controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createBooking);
router.get('/user', authenticateToken, getUserBookings);
router.get('/admin', authenticateToken, requireAdmin, getAllBookings);
router.put('/:id/status', authenticateToken, requireAdmin, updateBookingStatus);
router.delete('/:id', authenticateToken, requireAdmin, deleteBooking);

export default router;

//Ye file booking ke saare routes handle karti hai — user booking bana sakta hai & apni bookings dekh sakta hai, aur admin saari bookings dekh, update, aur delete kar sakta hai.
