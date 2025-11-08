import express from 'express';
import { submitFeedback, getAllFeedback, getUserFeedback } from '../controllers/feedback-controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, submitFeedback);
router.get('/user', authenticateToken, getUserFeedback);
router.get('/admin', authenticateToken, requireAdmin, getAllFeedback);

export default router;

//Users feedback de sakte hain aur apna dekh sakte hain — admin sabka feedback dekh sakta hai.