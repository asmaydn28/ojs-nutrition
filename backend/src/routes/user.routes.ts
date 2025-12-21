import { Router } from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController
} from '../controllers/user.controller';
import {
  assignRoleController,
  removeRoleController,
  getUserRolesController,
  getUserPermissionsController
} from '../controllers/role.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/permission.middleware';
import { PERMISSIONS } from '../constants/permissions';

const router: Router = Router();


// PROTECTED ROUTES - Token gerektiren
// GET /api/users - Tüm kullanıcıları listele
router.get(
  '/',
  authMiddleware,
  requirePermission(PERMISSIONS.USERS.READ_ANY),
  getAllUsersController
);

// GET /api/users/:id - Tek kullanıcı getir
router.get(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.USERS.READ_OWN, PERMISSIONS.USERS.READ_ANY),
  getUserByIdController
);

// PATCH /api/users/:id - Kullanıcı güncelle
router.patch(
  '/:id',
  authMiddleware,
  requirePermission(PERMISSIONS.USERS.UPDATE_OWN, PERMISSIONS.USERS.UPDATE_ANY),
  updateUserController
);


// USER ROLES - Kullanıcı rol yönetimi
// GET /api/users/:userId/roles - Kullanıcının rollerini getir
router.get(
  '/:userId/roles',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.READ),
  getUserRolesController
);

// POST /api/users/:userId/roles - Kullanıcıya rol ata
router.post(
  '/:userId/roles',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.ASSIGN),
  assignRoleController
);

// DELETE /api/users/:userId/roles/:roleId - Kullanıcıdan rol kaldır
router.delete(
  '/:userId/roles/:roleId',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.ASSIGN),
  removeRoleController
);

// GET /api/users/:userId/permissions - Kullanıcının tüm yetkilerini getir
router.get(
  '/:userId/permissions',
  authMiddleware,
  requirePermission(PERMISSIONS.ROLES.READ),
  getUserPermissionsController
);

export default router;

