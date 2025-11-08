import express from 'express';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menu-controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', authenticateToken, requireAdmin, addMenuItem);
router.put('/:id', authenticateToken, requireAdmin, updateMenuItem);
router.delete('/:id', authenticateToken, requireAdmin, deleteMenuItem);

export default router;

//User menu dekh sakta hai, aur admin menu add/update/delete kar sakta hai — ye file un sab routes ko manage karti hai.