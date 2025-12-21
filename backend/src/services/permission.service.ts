import prisma from '../config/prisma';
import { UserPermissionsResponse } from '../types/role.types';

// Kullanıcının tüm permission'larını getir (roller üzerinden)
export const getUserPermissions = async (userId: string): Promise<string[]> => {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  });

  const permissionSet = new Set<string>();
  
  for (const userRole of userRoles) {
    for (const permission of userRole.role.permissions) {
      permissionSet.add(permission.permissionKey);
    }
  }

  return Array.from(permissionSet);
};

// Kullanıcının belirli bir permission'a sahip olup olmadığını kontrol et
export const hasPermission = async (userId: string, permissionKey: string): Promise<boolean> => {
  const permissions = await getUserPermissions(userId);
  return permissions.includes(permissionKey);
};

// Kullanıcının belirtilen permission'lardan en az birine sahip olup olmadığını kontrol et
export const hasAnyPermission = async (userId: string, permissionKeys: string[]): Promise<boolean> => {
  const permissions = await getUserPermissions(userId);
  return permissionKeys.some(key => permissions.includes(key));
};

// Kullanıcının belirtilen tüm permission'lara sahip olup olmadığını kontrol et
export const hasAllPermissions = async (userId: string, permissionKeys: string[]): Promise<boolean> => {
  const permissions = await getUserPermissions(userId);
  return permissionKeys.every(key => permissions.includes(key));
};

// Kullanıcının detaylı permission bilgilerini getir (roller dahil)
export const getUserPermissionsDetailed = async (userId: string): Promise<UserPermissionsResponse> => {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  });

  const permissionSet = new Set<string>();
  const roleNames: string[] = [];

  for (const userRole of userRoles) {
    roleNames.push(userRole.role.name);
    for (const permission of userRole.role.permissions) {
      permissionSet.add(permission.permissionKey);
    }
  }

  return {
    userId,
    permissions: Array.from(permissionSet),
    roles: roleNames
  };
};

// Kullanıcının belirli bir role sahip olup olmadığını kontrol et
export const hasRole = async (userId: string, roleName: string): Promise<boolean> => {
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId,
      role: {
        name: roleName
      }
    }
  });

  return userRole !== null;
};

// Kullanıcının rol isimlerini getir
export const getUserRoleNames = async (userId: string): Promise<string[]> => {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        select: {
          name: true
        }
      }
    }
  });

  return userRoles.map(ur => ur.role.name);
};
