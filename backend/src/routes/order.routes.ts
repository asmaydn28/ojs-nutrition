import { Router } from 'express';
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

// PROTECTED ROUTES - Token gerektiren

// POST /api/orders - Sipariş oluştur
router.post('/', authMiddleware, createOrderController);

// GET /api/orders - Siparişleri listele
router.get('/', authMiddleware, getAllOrdersController);

// GET /api/orders/:id - Sipariş getir
router.get('/:id', authMiddleware, getOrderByIdController);

// PATCH /api/orders/:id - Sipariş durumunu güncelle
router.patch('/:id', authMiddleware, updateOrderController);

export default router;

