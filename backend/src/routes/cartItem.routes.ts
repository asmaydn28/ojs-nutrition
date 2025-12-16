import { Router } from 'express';
import {
  createCartItemController,
  getCartItemsController,
  getCartItemByIdController,
  updateCartItemController,
  deleteCartItemController,
  clearCartController
} from '../controllers/cartItem.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

// PROTECTED ROUTES - Token gerektiren

// POST /api/cart-items - Sepete ürün ekle
router.post('/', authMiddleware, createCartItemController);

// GET /api/cart-items - Sepeti listele
router.get('/', authMiddleware, getCartItemsController);

// DELETE /api/cart-items - Sepeti temizle (önce bu route, sonra :id route'u)
router.delete('/', authMiddleware, clearCartController);

// GET /api/cart-items/:id - Sepet öğesi getir
router.get('/:id', authMiddleware, getCartItemByIdController);

// PATCH /api/cart-items/:id - Sepet öğesini güncelle
router.patch('/:id', authMiddleware, updateCartItemController);

// DELETE /api/cart-items/:id - Sepet öğesini sil
router.delete('/:id', authMiddleware, deleteCartItemController);

export default router;

