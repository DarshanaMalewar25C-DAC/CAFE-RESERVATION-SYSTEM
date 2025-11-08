import express from 'express';
import { getDashboardStats } from '../controllers/dashboard-controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', authenticateToken, requireAdmin, getDashboardStats);

export default router;

//Ye route sirf admin ke liye hai — login + admin verify hone ke baad hi dashboard stats laata hai.