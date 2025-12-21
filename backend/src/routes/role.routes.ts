import { Router } from 'express';
import {
  createRoleController,
  getAllRolesController,
  getRoleByIdController,
  updateRoleController,
  deleteRoleController,
  addPermissionController,
  removePermissionController,
  getAllPermissionsController
} from '../controllers/role.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/permission.middleware';
import { PERMISSIONS } from '../constants/permissions';

const router: Router = Router();

// ==================== PUBLIC ROUTES ====================

// GET /api/permissions - Tüm mevcut permission'ları listele
router.get('/permissions', getAllPermissionsController);

// ==================== PROTECTED ROUTES ====================

// GET /api/roles - Rolleri listele
router.get(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.READ),
  getAllRolesController
);

// GET /api/roles/:id - Rol detayı
router.get(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.READ),
  getRoleByIdController
);

// POST /api/roles - Rol oluştur
router.post(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.CREATE),
  createRoleController
);

// PATCH /api/roles/:id - Rol güncelle
router.patch(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.UPDATE),
  updateRoleController
);

// DELETE /api/roles/:id - Rol sil
router.delete(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.DELETE),
  deleteRoleController
);

// ==================== ROLE PERMISSIONS ====================

// POST /api/roles/:id/permissions - Role permission ekle
router.post(
  '/:id/permissions',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.UPDATE),
  addPermissionController
);

// DELETE /api/roles/:id/permissions/:permissionKey - Role'den permission sil
router.delete(
  '/:id/permissions/:permissionKey',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.UPDATE),
  removePermissionController
);

export default router;
