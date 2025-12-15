import { Router } from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController
} from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

// ============================================
// PROTECTED ROUTES - Token gerektiren
// ============================================

// GET /api/users - Tüm kullanıcıları listele
router.get('/', authMiddleware, getAllUsersController);

// GET /api/users/:id - Tek kullanıcı getir
router.get('/:id', authMiddleware, getUserByIdController);

// PATCH /api/users/:id - Kullanıcı güncelle
router.patch('/:id', authMiddleware, updateUserController);

export default router;

