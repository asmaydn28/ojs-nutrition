import { Router } from 'express';
import {
  createProductCommentController,
  getAllCommentsController,
  getProductCommentByIdController,
  updateProductCommentController,
  deleteProductCommentController
} from '../controllers/productComment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

// GET /api/comments - Tüm yorumları getir
router.get('/', getAllCommentsController);

// POST /api/comments - Ürüne yorum ekle
router.post('/', authMiddleware, createProductCommentController);

// GET /api/comments/:id - Tek yorum getir
router.get('/:id', getProductCommentByIdController);

// PATCH /api/comments/:id - Yorum güncelle
router.patch('/:id', authMiddleware, updateProductCommentController);

// DELETE /api/comments/:id - Yorum sil
router.delete('/:id', authMiddleware, deleteProductCommentController);

export default router;