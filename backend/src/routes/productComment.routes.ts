import { Router, Request } from 'express';
import {
  createProductCommentController,
  getAllCommentsController,
  getProductCommentByIdController,
  updateProductCommentController,
  deleteProductCommentController
} from '../controllers/productComment.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requirePermission, requireOwnershipOrPermission } from '../middleware/permission.middleware';
import { PERMISSIONS } from '../constants/permissions';
import prisma from '../config/prisma';

const router: Router = Router();

// Helper: Yorum sahibinin ID'sini getir
const getCommentOwnerId = async (req: Request): Promise<string | null> => {
  const id = req.params.id;
  if (!id) return null;
  const comment = await prisma.productComment.findUnique({
    where: { id },
    select: { userId: true }
  });
  return comment?.userId ?? null;
};

// PUBLIC ROUTES--------------------------------

// GET /api/comments - Tüm yorumları getir
router.get('/', getAllCommentsController);

// GET /api/comments/:id - Tek yorum getir
router.get('/:id', getProductCommentByIdController);

// PROTECTED ROUTES--------------------------------

// POST /api/comments - Ürüne yorum ekle
router.post(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.COMMENTS.CREATE),
  createProductCommentController
);

// PATCH /api/comments/:id - Yorum güncelle (kendi yorumu veya any yetkisi)
router.patch(
  '/:id',
  authMiddleware,
  requireOwnershipOrPermission(
    PERMISSIONS.COMMENTS.UPDATE_OWN,
    PERMISSIONS.COMMENTS.UPDATE_ANY,
    getCommentOwnerId
  ),
  updateProductCommentController
);

// DELETE /api/comments/:id - Yorum sil (kendi yorumu veya any yetkisi)
router.delete(
  '/:id',
  authMiddleware,
  requireOwnershipOrPermission(
    PERMISSIONS.COMMENTS.DELETE_OWN,
    PERMISSIONS.COMMENTS.DELETE_ANY,
    getCommentOwnerId
  ),
  deleteProductCommentController
);

export default router;