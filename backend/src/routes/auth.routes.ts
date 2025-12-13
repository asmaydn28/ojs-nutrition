import { Router } from 'express';
import {
  registerController,
  loginController,
  refreshTokenController,
  getMeController
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

// PUBLIC ROUTES - Token gerektirmeyen
// POST /api/auth/register - Yeni kullanıcı kaydı
router.post('/register', registerController);

// POST /api/auth/login - Kullanıcı girişi
router.post('/login', loginController);

// POST /api/auth/refresh - Token yenileme
router.post('/refresh', refreshTokenController);


// PROTECTED ROUTES - Token gerektiren
// GET /api/auth/me - Giriş yapan kullanıcı bilgisi
router.get('/me', authMiddleware, getMeController);

export default router;