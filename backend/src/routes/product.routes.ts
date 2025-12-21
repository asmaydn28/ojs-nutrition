import { Router } from 'express';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  getProductBySlugController,
  updateProductController,
  deleteProductController
} from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/permission.middleware';
import { PERMISSIONS } from '../constants/permissions';

const router: Router = Router();
    
// PUBLIC ROUTES - Token gerektirmeyen--------------------------------

// GET /api/products - Tüm ürünleri listele (filtre + sayfalama)
router.get('/', getAllProductsController);

// GET /api/products/slug/:slug - Slug ile ürün getir
router.get('/slug/:slug', getProductBySlugController);

// GET /api/products/:id - ID ile ürün getir
router.get('/:id', getProductByIdController);

// PROTECTED ROUTES - Token gerektiren (Admin/Moderator)--------------------------------

// POST /api/products - Yeni ürün oluştur
router.post(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.PRODUCTS.CREATE),
  createProductController
);

// PATCH /api/products/:id - Ürün güncelle
router.patch(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.PRODUCTS.UPDATE),
  updateProductController
);

// DELETE /api/products/:id - Ürün sil
router.delete(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.PRODUCTS.DELETE),
  deleteProductController
);

export default router;