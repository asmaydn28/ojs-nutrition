import { PrismaClient } from '@prisma/client';
import { PERMISSIONS, getAllPermissions } from '../src/constants/permissions';

const prisma = new PrismaClient();

// Varsayılan roller ve permission'ları
const DEFAULT_ROLES = {
  ADMIN: {
    name: 'ADMIN',
    // Admin tüm yetkilere sahip
    permissions: getAllPermissions()
  },
  MODERATOR: {
    name: 'MODERATOR',
    permissions: [
      // Users
      PERMISSIONS.USERS.READ_OWN,
      PERMISSIONS.USERS.READ_ANY,
      PERMISSIONS.USERS.UPDATE_OWN,
      
      // Categories
      PERMISSIONS.CATEGORIES.READ,
      PERMISSIONS.CATEGORIES.CREATE,
      PERMISSIONS.CATEGORIES.UPDATE,
      
      // Products
      PERMISSIONS.PRODUCTS.READ,
      PERMISSIONS.PRODUCTS.CREATE,
      PERMISSIONS.PRODUCTS.UPDATE,
      
      // Product Photos
      PERMISSIONS.PRODUCT_PHOTOS.CREATE,
      PERMISSIONS.PRODUCT_PHOTOS.UPDATE,
      PERMISSIONS.PRODUCT_PHOTOS.DELETE,
      
      // Comments - moderator herkesin yorumunu yönetebilir
      PERMISSIONS.COMMENTS.READ,
      PERMISSIONS.COMMENTS.CREATE,
      PERMISSIONS.COMMENTS.UPDATE_OWN,
      PERMISSIONS.COMMENTS.UPDATE_ANY,
      PERMISSIONS.COMMENTS.DELETE_OWN,
      PERMISSIONS.COMMENTS.DELETE_ANY,
      
      // Carts
      PERMISSIONS.CARTS.READ_OWN,
      PERMISSIONS.CARTS.UPDATE_OWN,
      PERMISSIONS.CARTS.DELETE_OWN,
      
      // Orders - moderator tüm siparişleri görebilir
      PERMISSIONS.ORDERS.CREATE_OWN,
      PERMISSIONS.ORDERS.READ_OWN,
      PERMISSIONS.ORDERS.READ_ANY,
      PERMISSIONS.ORDERS.UPDATE_OWN,
      PERMISSIONS.ORDERS.UPDATE_ANY,
      
      // Roles - sadece okuma
      PERMISSIONS.ROLES.READ,
    ]
  },
  USER: {
    name: 'USER',
    permissions: [
      // Users - sadece kendi profili
      PERMISSIONS.USERS.READ_OWN,
      PERMISSIONS.USERS.UPDATE_OWN,
      
      // Categories - sadece okuma
      PERMISSIONS.CATEGORIES.READ,
      
      // Products - sadece okuma
      PERMISSIONS.PRODUCTS.READ,
      
      // Comments - kendi yorumları
      PERMISSIONS.COMMENTS.READ,
      PERMISSIONS.COMMENTS.CREATE,
      PERMISSIONS.COMMENTS.UPDATE_OWN,
      PERMISSIONS.COMMENTS.DELETE_OWN,
      
      // Carts - sadece kendi sepeti
      PERMISSIONS.CARTS.READ_OWN,
      PERMISSIONS.CARTS.UPDATE_OWN,
      PERMISSIONS.CARTS.DELETE_OWN,
      
      // Orders - sadece kendi siparişleri
      PERMISSIONS.ORDERS.CREATE_OWN,
      PERMISSIONS.ORDERS.READ_OWN,
      PERMISSIONS.ORDERS.UPDATE_OWN,
    ]
  }
};

async function main() {
  console.log('🌱 Seeding database...\n');

  // Her rol için
  for (const [roleName, roleData] of Object.entries(DEFAULT_ROLES)) {
    console.log(`📦 Creating role: ${roleName}`);
    
    // Rol var mı kontrol et
    let role = await prisma.role.findUnique({
      where: { name: roleData.name }
    });

    if (!role) {
      // Rol yoksa oluştur
      role = await prisma.role.create({
        data: { name: roleData.name }
      });
      console.log(`   ✅ Role created: ${role.id}`);
    } else {
      console.log(`   ⏭️  Role already exists: ${role.id}`);
    }

    // Permission'ları ekle
    for (const permissionKey of roleData.permissions) {
      const existingPermission = await prisma.rolePermission.findUnique({
        where: {
          roleId_permissionKey: {
            roleId: role.id,
            permissionKey
          }
        }
      });

      if (!existingPermission) {
        await prisma.rolePermission.create({
          data: {
            roleId: role.id,
            permissionKey
          }
        });
      }
    }
    
    console.log(`   📝 ${roleData.permissions.length} permissions assigned\n`);
  }

  // Mevcut kullanıcılara varsayılan USER rolü ata
  console.log('👥 Assigning default USER role to existing users...');
  
  const userRole = await prisma.role.findUnique({
    where: { name: 'USER' }
  });

  if (userRole) {
    const usersWithoutRoles = await prisma.user.findMany({
      where: {
        roles: {
          none: {}
        }
      }
    });

    for (const user of usersWithoutRoles) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: userRole.id
        }
      });
      console.log(`   ✅ USER role assigned to: ${user.email}`);
    }

    if (usersWithoutRoles.length === 0) {
      console.log('   ⏭️  All users already have roles');
    }
  }

  console.log('\n✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
