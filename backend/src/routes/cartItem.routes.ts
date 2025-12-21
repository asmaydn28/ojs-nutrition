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
import { requirePermission } from '../middleware/permission.middleware';
import { PERMISSIONS } from '../constants/permissions';

const router: Router = Router();

// PROTECTED ROUTES - Token gerektiren (Kullanıcı sadece kendi sepetini yönetebilir)

// POST /api/cart-items - Sepete ürün ekle
router.post(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.CARTS.UPDATE_OWN),
  createCartItemController
);

// GET /api/cart-items - Sepeti listele
router.get(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.CARTS.READ_OWN),
  getCartItemsController
);

// DELETE /api/cart-items - Sepeti temizle (önce bu route, sonra :id route'u)
router.delete(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.CARTS.DELETE_OWN),
  clearCartController
);

// GET /api/cart-items/:id - Sepet öğesi getir
router.get(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.CARTS.READ_OWN),
  getCartItemByIdController
);

// PATCH /api/cart-items/:id - Sepet öğesini güncelle
router.patch(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.CARTS.UPDATE_OWN),
  updateCartItemController
);

// DELETE /api/cart-items/:id - Sepet öğesini sil
router.delete(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.CARTS.DELETE_OWN),
  deleteCartItemController
);

export default router;

