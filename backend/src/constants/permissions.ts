// CBAC Permission Tanımları
// Format: resource:action veya resource:action:scope (own = kendi kaynakları, any = tüm kaynaklar)

export const PERMISSIONS = {
  USERS: {
    READ_OWN: 'users:read:own',
    READ_ANY: 'users:read:any',
    UPDATE_OWN: 'users:update:own',
    UPDATE_ANY: 'users:update:any',
    DELETE_ANY: 'users:delete:any',
  },

  CATEGORIES: {
    READ: 'categories:read',
    CREATE: 'categories:create',
    UPDATE: 'categories:update',
    DELETE: 'categories:delete',
  },

  PRODUCTS: {
    READ: 'products:read',
    CREATE: 'products:create',
    UPDATE: 'products:update',
    DELETE: 'products:delete',
  },

  PRODUCT_PHOTOS: {
    CREATE: 'product-photos:create',
    UPDATE: 'product-photos:update',
    DELETE: 'product-photos:delete',
  },

  COMMENTS: {
    READ: 'comments:read',
    CREATE: 'comments:create',
    UPDATE_OWN: 'comments:update:own',
    UPDATE_ANY: 'comments:update:any',
    DELETE_OWN: 'comments:delete:own',
    DELETE_ANY: 'comments:delete:any',
  },

  CARTS: {
    READ_OWN: 'carts:read:own',
    UPDATE_OWN: 'carts:update:own',
    DELETE_OWN: 'carts:delete:own',
  },

  ORDERS: {
    CREATE_OWN: 'orders:create:own',
    READ_OWN: 'orders:read:own',
    READ_ANY: 'orders:read:any',
    UPDATE_OWN: 'orders:update:own',
    UPDATE_ANY: 'orders:update:any',
  },

  ROLES: {
    READ: 'roles:read',
    CREATE: 'roles:create',
    UPDATE: 'roles:update',
    DELETE: 'roles:delete',
    ASSIGN: 'roles:assign',
  },
} as const;

// Permission key tiplerini çıkar
type PermissionValues<T> = T extends object
  ? T[keyof T] extends string
    ? T[keyof T]
    : PermissionValues<T[keyof T]>
  : never;

export type PermissionKey = PermissionValues<typeof PERMISSIONS>;

// Tüm permission'ları düz liste olarak al
export const getAllPermissions = (): string[] => {
  const permissions: string[] = [];
  
  const extractPermissions = (obj: Record<string, unknown>) => {
    for (const value of Object.values(obj)) {
      if (typeof value === 'string') {
        permissions.push(value);
      } else if (typeof value === 'object' && value !== null) {
        extractPermissions(value as Record<string, unknown>);
      }
    }
  };
  
  extractPermissions(PERMISSIONS);
  return permissions;
};

// Permission'ın geçerli olup olmadığını kontrol et
export const isValidPermission = (permission: string): boolean => {
  return getAllPermissions().includes(permission);
};
