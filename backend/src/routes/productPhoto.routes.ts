import { Router } from 'express';
import {
  createProductPhotoController,
  getPhotosByProductIdController,
  getProductPhotoByIdController,
  updateProductPhotoController,
  deleteProductPhotoController
} from '../controllers/productPhoto.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

// POST /api/product-photos - Ürüne fotoğraf ekle
router.post('/', authMiddleware, createProductPhotoController);

// GET /api/product-photos/:id - Tek fotoğraf getir
router.get('/:id', getProductPhotoByIdController);

// PATCH /api/product-photos/:id - Fotoğraf güncelle
router.patch('/:id', authMiddleware, updateProductPhotoController);

// DELETE /api/product-photos/:id - Fotoğraf sil
router.delete('/:id', authMiddleware, deleteProductPhotoController);

export default router;