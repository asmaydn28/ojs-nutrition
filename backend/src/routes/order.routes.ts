import { Router, Request } from 'express';
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requirePermission, requireOwnershipOrPermission } from '../middleware/permission.middleware';
import { PERMISSIONS } from '../constants/permissions';
import prisma from '../config/prisma';

const router: Router = Router();

// Helper: Sipariş sahibinin ID'sini getir
const getOrderOwnerId = async (req: Request): Promise<string | null> => {
  const id = req.params.id;
  if (!id) return null;
  const order = await prisma.order.findUnique({
    where: { id },
    select: { userId: true }
  });
  return order?.userId ?? null;
};

// PROTECTED ROUTES - Token gerektiren

// POST /api/orders - Sipariş oluştur
router.post(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.ORDERS.CREATE_OWN),
  createOrderController
);

// GET /api/orders - Siparişleri listele (kendi siparişleri veya tümü)
router.get(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.ORDERS.READ_OWN, PERMISSIONS.ORDERS.READ_ANY),
  getAllOrdersController
);

// GET /api/orders/:id - Sipariş getir (kendi siparişi veya any yetkisi)
router.get(
  '/:id',
  authMiddleware,
  requireOwnershipOrPermission(
    PERMISSIONS.ORDERS.READ_OWN,
    PERMISSIONS.ORDERS.READ_ANY,
    getOrderOwnerId
  ),
  getOrderByIdController
);

// PATCH /api/orders/:id - Sipariş durumunu güncelle (kendi siparişi veya any yetkisi)
router.patch(
  '/:id',
  authMiddleware,
  requireOwnershipOrPermission(
    PERMISSIONS.ORDERS.UPDATE_OWN,
    PERMISSIONS.ORDERS.UPDATE_ANY,
    getOrderOwnerId
  ),
  updateOrderController
);

export default router;

