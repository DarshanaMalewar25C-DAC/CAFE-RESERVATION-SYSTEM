import express from 'express';
import { getTables, getAvailableTables, addTable, updateTable, deleteTable, getTableStatus } from '../controllers/table-controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTables);
router.get('/available', getAvailableTables);
router.get('/status', authenticateToken, requireAdmin, getTableStatus);
router.post('/', authenticateToken, requireAdmin, addTable);
router.put('/:id', authenticateToken, requireAdmin, updateTable);
router.delete('/:id', authenticateToken, requireAdmin, deleteTable);

export default router;

//Users tables dekh sakte hain aur availability check kar sakte hain, aur admin tables ko add/update/delete/status manage kar sakta hai — ye file un saare routes ko handle karti hai.