import prisma from '../config/prisma';
import { 
  CreateRoleInput, 
  UpdateRoleInput, 
  RoleResponse,
  UserRolesResponse 
} from '../types/role.types';
import { isValidPermission } from '../constants/permissions';

// HELPER - Role'ü response formatına çevir
const formatRole = (role: {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: { permissionKey: string }[];
}): RoleResponse => ({
  id: role.id,
  name: role.name,
  permissions: role.permissions.map(p => p.permissionKey),
  createdAt: role.createdAt,
  updatedAt: role.updatedAt
});

// ==================== ROLE CRUD ====================

// CREATE - Rol oluştur
export const createRole = async (input: CreateRoleInput): Promise<RoleResponse> => {
  // İsim benzersiz mi kontrol et
  const existingRole = await prisma.role.findUnique({
    where: { name: input.name }
  });

  if (existingRole) {
    throw new Error('Bu isimde bir rol zaten mevcut');
  }

  // Permission'ları doğrula
  if (input.permissions) {
    for (const perm of input.permissions) {
      if (!isValidPermission(perm)) {
        throw new Error(`Geçersiz permission: ${perm}`);
      }
    }
  }

  // Transaction ile rol ve permission'ları oluştur
  const role = await prisma.$transaction(async (tx) => {
    const newRole = await tx.role.create({
      data: {
        name: input.name
      }
    });

    // Permission'ları ekle
    if (input.permissions && input.permissions.length > 0) {
      await tx.rolePermission.createMany({
        data: input.permissions.map(perm => ({
          roleId: newRole.id,
          permissionKey: perm
        }))
      });
    }

    return await tx.role.findUnique({
      where: { id: newRole.id },
      include: { permissions: true }
    });
  });

  if (!role) {
    throw new Error('Rol oluşturulamadı');
  }

  return formatRole(role);
};

// GET ALL - Tüm rolleri listele
export const getAllRoles = async (): Promise<RoleResponse[]> => {
  const roles = await prisma.role.findMany({
    include: { permissions: true },
    orderBy: { name: 'asc' }
  });

  return roles.map(formatRole);
};

// GET BY ID - Rol getir
export const getRoleById = async (id: string): Promise<RoleResponse> => {
  const role = await prisma.role.findUnique({
    where: { id },
    include: { permissions: true }
  });

  if (!role) {
    throw new Error('Rol bulunamadı');
  }

  return formatRole(role);
};

// UPDATE - Rol güncelle
export const updateRole = async (id: string, input: UpdateRoleInput): Promise<RoleResponse> => {
  const existingRole = await prisma.role.findUnique({
    where: { id }
  });

  if (!existingRole) {
    throw new Error('Rol bulunamadı');
  }

  // İsim değişiyorsa benzersizlik kontrolü
  if (input.name && input.name !== existingRole.name) {
    const duplicateRole = await prisma.role.findUnique({
      where: { name: input.name }
    });

    if (duplicateRole) {
      throw new Error('Bu isimde bir rol zaten mevcut');
    }
  }

  const updatedRole = await prisma.role.update({
    where: { id },
    data: {
      name: input.name
    },
    include: { permissions: true }
  });

  return formatRole(updatedRole);
};

// DELETE - Rol sil
export const deleteRole = async (id: string): Promise<void> => {
  const existingRole = await prisma.role.findUnique({
    where: { id }
  });

  if (!existingRole) {
    throw new Error('Rol bulunamadı');
  }

  // Varsayılan rolleri silmeyi engelle
  const protectedRoles = ['ADMIN', 'MODERATOR', 'USER'];
  if (protectedRoles.includes(existingRole.name)) {
    throw new Error('Varsayılan roller silinemez');
  }

  await prisma.role.delete({
    where: { id }
  });
};

// ==================== ROLE PERMISSIONS ====================

// ADD PERMISSION - Role permission ekle
export const addPermissionToRole = async (roleId: string, permissionKey: string): Promise<RoleResponse> => {
  // Rol var mı kontrol et
  const role = await prisma.role.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new Error('Rol bulunamadı');
  }

  // Permission geçerli mi kontrol et
  if (!isValidPermission(permissionKey)) {
    throw new Error(`Geçersiz permission: ${permissionKey}`);
  }

  // Permission zaten var mı kontrol et
  const existingPermission = await prisma.rolePermission.findUnique({
    where: {
      roleId_permissionKey: {
        roleId,
        permissionKey
      }
    }
  });

  if (existingPermission) {
    throw new Error('Bu permission zaten role ekli');
  }

  await prisma.rolePermission.create({
    data: {
      roleId,
      permissionKey
    }
  });

  const updatedRole = await prisma.role.findUnique({
    where: { id: roleId },
    include: { permissions: true }
  });

  if (!updatedRole) {
    throw new Error('Rol bulunamadı');
  }

  return formatRole(updatedRole);
};

// REMOVE PERMISSION - Role'den permission sil
export const removePermissionFromRole = async (roleId: string, permissionKey: string): Promise<RoleResponse> => {
  // Rol var mı kontrol et
  const role = await prisma.role.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new Error('Rol bulunamadı');
  }

  // Permission var mı kontrol et
  const existingPermission = await prisma.rolePermission.findUnique({
    where: {
      roleId_permissionKey: {
        roleId,
        permissionKey
      }
    }
  });

  if (!existingPermission) {
    throw new Error('Bu permission role ekli değil');
  }

  await prisma.rolePermission.delete({
    where: {
      roleId_permissionKey: {
        roleId,
        permissionKey
      }
    }
  });

  const updatedRole = await prisma.role.findUnique({
    where: { id: roleId },
    include: { permissions: true }
  });

  if (!updatedRole) {
    throw new Error('Rol bulunamadı');
  }

  return formatRole(updatedRole);
};

// ==================== USER ROLES ====================

// ASSIGN ROLE - Kullanıcıya rol ata
export const assignRoleToUser = async (userId: string, roleId: string): Promise<UserRolesResponse> => {
  // Kullanıcı var mı kontrol et
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  // Rol var mı kontrol et
  const role = await prisma.role.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new Error('Rol bulunamadı');
  }

  // Kullanıcı zaten bu role sahip mi kontrol et
  const existingUserRole = await prisma.userRole.findUnique({
    where: {
      userId_roleId: {
        userId,
        roleId
      }
    }
  });

  if (existingUserRole) {
    throw new Error('Kullanıcı zaten bu role sahip');
  }

  await prisma.userRole.create({
    data: {
      userId,
      roleId
    }
  });

  return getUserRoles(userId);
};

// REMOVE ROLE - Kullanıcıdan rol kaldır
export const removeRoleFromUser = async (userId: string, roleId: string): Promise<UserRolesResponse> => {
  // Kullanıcı var mı kontrol et
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  // Rol ataması var mı kontrol et
  const existingUserRole = await prisma.userRole.findUnique({
    where: {
      userId_roleId: {
        userId,
        roleId
      }
    }
  });

  if (!existingUserRole) {
    throw new Error('Kullanıcı bu role sahip değil');
  }

  await prisma.userRole.delete({
    where: {
      userId_roleId: {
        userId,
        roleId
      }
    }
  });

  return getUserRoles(userId);
};

// GET USER ROLES - Kullanıcının rollerini getir
export const getUserRoles = async (userId: string): Promise<UserRolesResponse> => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  return {
    userId,
    roles: userRoles.map(ur => ({
      id: ur.role.id,
      name: ur.role.name,
      assignedAt: ur.createdAt
    }))
  };
};
