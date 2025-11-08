import express from 'express';
import { register, login } from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;

//Ye file sirf do routes banati hai — register aur login — aur unhe auth-controller ke functions se connect karti hai.