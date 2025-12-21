// Rol oluşturma için gerekli veriler
export interface CreateRoleInput {
  name: string;
  permissions?: string[];
}

// Rol güncelleme için gerekli veriler
export interface UpdateRoleInput {
  name?: string;
}

// Role permission ekleme için gerekli veriler
export interface AddPermissionInput {
  permissionKey: string;
}

// Kullanıcıya rol atama için gerekli veriler
export interface AssignRoleInput {
  roleId: string;
}

// Rol yanıt tipi
export interface RoleResponse {
  id: string;
  name: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Kullanıcı rolleri yanıt tipi
export interface UserRolesResponse {
  userId: string;
  roles: {
    id: string;
    name: string;
    assignedAt: Date;
  }[];
}

// Kullanıcının tüm permission'larını içeren yanıt
export interface UserPermissionsResponse {
  userId: string;
  permissions: string[];
  roles: string[];
}
