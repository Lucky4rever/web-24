import { Router } from 'express';
import { registerUser, loginUser, verifyUser } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', verifyUser);

export default router;
