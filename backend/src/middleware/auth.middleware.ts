import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.utils';

// AUTH MIDDLEWARE - Token doğrulama
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      // Authorization header'ı al
      const authHeader = req.headers.authorization;
  
      // Header var mı kontrol et
      if (!authHeader) {
        res.status(401).json({
          success: false,
          message: 'Authorization header gerekli'
        });
        return;
      }
  
      // Bearer token formatında mı kontrol et
      const parts = authHeader.split(' ');
  
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({
          success: false,
          message: 'Token formatı geçersiz. Format: Bearer <token>'
        });
        return;
      }
  
      const token = parts[1];
  
      // Token doğrula
      const payload = verifyAccessToken(token);
  
      if (!payload) {
        res.status(401).json({
          success: false,
          message: 'Geçersiz veya süresi dolmuş token'
        });
        return;
      }
  
      // Kullanıcı bilgisini request'e ekle
      req.user = payload;
  
      // Sonraki middleware/controller'a geç
      next();
    } catch {
      res.status(500).json({
        success: false,
        message: 'Token doğrulama hatası'
      });
    }
  };