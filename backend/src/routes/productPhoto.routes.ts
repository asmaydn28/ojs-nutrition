import { Router } from 'express';
import {
  createProductPhotoController,
  getProductPhotoByIdController,
  updateProductPhotoController,
  deleteProductPhotoController
} from '../controllers/productPhoto.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/permission.middleware';
import { PERMISSIONS } from '../constants/permissions';

const router: Router = Router();

// PUBLIC ROUTES--------------------------------

// GET /api/product-photos/:id - Tek fotoğraf getir
router.get('/:id', getProductPhotoByIdController);

// PROTECTED ROUTES--------------------------------

// POST /api/product-photos - Ürüne fotoğraf ekle
router.post(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.PRODUCT_PHOTOS.CREATE),
  createProductPhotoController
);

// PATCH /api/product-photos/:id - Fotoğraf güncelle
router.patch(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.PRODUCT_PHOTOS.UPDATE),
  updateProductPhotoController
);

// DELETE /api/product-photos/:id - Fotoğraf sil
router.delete(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.PRODUCT_PHOTOS.DELETE),
  deleteProductPhotoController
);

export default router;