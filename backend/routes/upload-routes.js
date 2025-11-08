import express from 'express';
import { uploadImage, upload } from '../controllers/upload-controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/image', authenticateToken, upload.single('image'), uploadImage);

export default router;

//Login user ya admin backend me image upload kar sakta hai, Multer save karta hai aur uploadImage URL return karta hai.