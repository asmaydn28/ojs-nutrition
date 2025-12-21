import { Request, Response } from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  addPermissionToRole,
  removePermissionFromRole,
  assignRoleToUser,
  removeRoleFromUser,
  getUserRoles
} from '../services/role.service';
import { getUserPermissionsDetailed } from '../services/permission.service';
import { getAllPermissions } from '../constants/permissions';

// ==================== ROLE CRUD ====================

// CREATE - POST /api/roles
export const createRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const role = await createRole(req.body);

    res.status(201).json({
      success: true,
      message: 'Rol başarıyla oluşturuldu',
      data: role
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rol oluşturulamadı';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET ALL - GET /api/roles
export const getAllRolesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roles = await getAllRoles();

    res.status(200).json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Roller getirilemedi'
    });
  }
};

// GET BY ID - GET /api/roles/:id
export const getRoleByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const role = await getRoleById(id);

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rol bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// UPDATE - PATCH /api/roles/:id
export const updateRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const role = await updateRole(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Rol güncellendi',
      data: role
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rol güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// DELETE - DELETE /api/roles/:id
export const deleteRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteRole(id);

    res.status(200).json({
      success: true,
      message: 'Rol silindi'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rol silinemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// ==================== ROLE PERMISSIONS ====================

// ADD PERMISSION - POST /api/roles/:id/permissions
export const addPermissionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { permissionKey } = req.body;

    if (!permissionKey) {
      res.status(400).json({
        success: false,
        message: 'permissionKey gerekli'
      });
      return;
    }

    const role = await addPermissionToRole(id, permissionKey);

    res.status(200).json({
      success: true,
      message: 'Permission eklendi',
      data: role
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Permission eklenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// REMOVE PERMISSION - DELETE /api/roles/:id/permissions/:permissionKey
export const removePermissionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, permissionKey } = req.params;
    const role = await removePermissionFromRole(id, permissionKey);

    res.status(200).json({
      success: true,
      message: 'Permission kaldırıldı',
      data: role
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Permission kaldırılamadı';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// ==================== USER ROLES ====================

// ASSIGN ROLE - POST /api/users/:userId/roles
export const assignRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      res.status(400).json({
        success: false,
        message: 'roleId gerekli'
      });
      return;
    }

    const userRoles = await assignRoleToUser(userId, roleId);

    res.status(200).json({
      success: true,
      message: 'Rol atandı',
      data: userRoles
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rol atanamadı';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// REMOVE ROLE - DELETE /api/users/:userId/roles/:roleId
export const removeRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, roleId } = req.params;
    const userRoles = await removeRoleFromUser(userId, roleId);

    res.status(200).json({
      success: true,
      message: 'Rol kaldırıldı',
      data: userRoles
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rol kaldırılamadı';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET USER ROLES - GET /api/users/:userId/roles
export const getUserRolesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const userRoles = await getUserRoles(userId);

    res.status(200).json({
      success: true,
      data: userRoles
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Roller getirilemedi';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// GET USER PERMISSIONS - GET /api/users/:userId/permissions
export const getUserPermissionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const permissions = await getUserPermissionsDetailed(userId);

    res.status(200).json({
      success: true,
      data: permissions
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Yetkiler getirilemedi';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// GET MY PERMISSIONS - GET /api/auth/permissions
export const getMyPermissionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    const permissions = await getUserPermissionsDetailed(userId);

    res.status(200).json({
      success: true,
      data: permissions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Yetkiler getirilemedi'
    });
  }
};

// GET ALL AVAILABLE PERMISSIONS - GET /api/permissions
export const getAllPermissionsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const permissions = getAllPermissions();

    res.status(200).json({
      success: true,
      data: permissions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Permission listesi getirilemedi'
    });
  }
};
