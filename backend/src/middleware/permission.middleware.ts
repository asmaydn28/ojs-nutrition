import { Request, Response, NextFunction } from 'express';
import { getUserPermissions } from '../services/permission.service';

// Belirtilen permission'lardan en az birine sahip olması gerekir
export const requirePermission = (...requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Kimlik doğrulama gerekli'
        });
        return;
      }

      const userPermissions = await getUserPermissions(userId);

      // Check if user has at least one required permission
      const hasPermission = requiredPermissions.some(
        permission => userPermissions.includes(permission)
      );

      if (!hasPermission) {
        res.status(403).json({
          success: false,
          message: 'Bu işlem için yetkiniz bulunmuyor',
          required: requiredPermissions
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Permission middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Yetkilendirme kontrolü sırasında bir hata oluştu'
      });
    }
  };
};

// Belirtilen tüm permission'lara sahip olması gerekir
export const requireAllPermissions = (...requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Kimlik doğrulama gerekli'
        });
        return;
      }

      const userPermissions = await getUserPermissions(userId);

      // Kullanıcının tüm permission'lara sahip olup olmadığını kontrol et
      const hasAllPermissions = requiredPermissions.every(
        permission => userPermissions.includes(permission)
      );

      if (!hasAllPermissions) {
        res.status(403).json({
          success: false,
          message: 'Bu işlem için yetkiniz bulunmuyor',
          required: requiredPermissions
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Permission middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Yetkilendirme kontrolü sırasında bir hata oluştu'
      });
    }
  };
};

// Sahiplik kontrolü: kendi kaynakları için "own" permission veya tümü için "any" permission gerekir
export const requireOwnershipOrPermission = (
  ownPermission: string,
  anyPermission: string,
  getResourceOwnerId: (req: Request) => Promise<string | null>
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Kimlik doğrulama gerekli'
        });
        return;
      }

      const userPermissions = await getUserPermissions(userId);

      // Kullanıcının "any" permission'ı varsa erişime izin ver
      if (userPermissions.includes(anyPermission)) {
        next();
        return;
      }

      // Kullanıcının "own" permission'ı olup olmadığını kontrol et
      if (!userPermissions.includes(ownPermission)) {
        res.status(403).json({
          success: false,
          message: 'Bu işlem için yetkiniz bulunmuyor'
        });
        return;
      }

      // Kullanıcının "own" permission'ı var, sahiplik kontrolü yap
      const resourceOwnerId = await getResourceOwnerId(req);

      if (!resourceOwnerId) {
        res.status(404).json({
          success: false,
          message: 'Kaynak bulunamadı'
        });
        return;
      }

      if (resourceOwnerId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Bu kaynağa erişim yetkiniz bulunmuyor'
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Ownership middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Yetkilendirme kontrolü sırasında bir hata oluştu'
      });
    }
  };
};

// Kaynağın sahibi olması gerekir (permission kontrolü yok, sadece sahiplik)
export const requireOwnership = (
  getResourceOwnerId: (req: Request) => Promise<string | null>
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Kimlik doğrulama gerekli'
        });
        return;
      }

      const resourceOwnerId = await getResourceOwnerId(req);

      if (!resourceOwnerId) {
        res.status(404).json({
          success: false,
          message: 'Kaynak bulunamadı'
        });
        return;
      }

      if (resourceOwnerId !== userId) {
        res.status(403).json({
          success: false,
          message: 'Bu kaynağa erişim yetkiniz bulunmuyor'
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Ownership middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Yetkilendirme kontrolü sırasında bir hata oluştu'
      });
    }
  };
};

// Kullanıcı permission'larını request objesine ekle (controller erişimi için)
export const attachPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (userId) {
      const permissions = await getUserPermissions(userId);
      req.userPermissions = permissions;
    } else {
      req.userPermissions = [];
    }

    next();
  } catch (error) {
    console.error('Attach permissions error:', error);
    req.userPermissions = [];
    next();
  }
};
