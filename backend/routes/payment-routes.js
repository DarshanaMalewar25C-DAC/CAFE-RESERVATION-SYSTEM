import express from 'express';
import { createPayment, updatePaymentStatus, getAllPayments, getUserPayments } from '../controllers/payment-controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createPayment);
router.get('/user', authenticateToken, getUserPayments);
router.get('/admin', authenticateToken, requireAdmin, getAllPayments);
router.put('/:id/status', authenticateToken, requireAdmin, updatePaymentStatus);

export default router;

//User apni payment create aur dekh sakta hai, aur admin sab payments manage/update kar sakta hai — ye file un routes ko handle karti hai.