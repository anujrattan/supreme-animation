import { Router } from 'express';
import { login, signup, verifyToken, logout } from '../controllers/auth.controller';
import { validateLogin, validateSignup } from '../middleware/auth.validation.middleware';

const router = Router();

router.post('/login', validateLogin, login);
router.post('/signup', validateSignup, signup);
router.post('/verify', verifyToken);
router.post('/logout', logout);

export default router;

