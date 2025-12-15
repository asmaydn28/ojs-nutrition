import { Request, Response } from 'express';
import { register, login, getUserById, logout, logoutAll } from '../services/auth.service';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import { TokenPayload } from '../types/auth.types';


// REGISTER CONTROLLER - POST /api/auth/register
export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await register(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla oluşturuldu',
      data: result
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kayıt işlemi başarısız';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// LOGIN CONTROLLER - POST /api/auth/login
export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await login(req.body);
    
    res.status(200).json({
      success: true,
      message: 'Giriş başarılı',
      data: result
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Giriş işlemi başarısız';
    res.status(401).json({
      success: false,
      message
    });
  }
};


// REFRESH TOKEN CONTROLLER - POST /api/auth/refresh
export const refreshTokenController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: 'Refresh token gerekli'
      });
      return;
    }

    // Refresh token'ı doğrula
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      res.status(401).json({
        success: false,
        message: 'Geçersiz refresh token'
      });
      return;
    }

    // Yeni token'lar oluştur
    const tokenPayload: TokenPayload = {
      userId: payload.userId,
      email: payload.email
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.status(200).json({
      success: true,
      message: 'Token yenilendi',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Token yenileme başarısız'
    });
  }
};


// GET ME CONTROLLER - GET /api/auth/me
export const getMeController = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user middleware'den gelecek
    const userId = (req as Request & { user: TokenPayload }).user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Yetkisiz erişim'
      });
      return;
    }

    const user = await getUserById(userId);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kullanıcı bilgisi alınamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};


// LOGOUT CONTROLLER - POST /api/auth/logout
export const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    await logout();

    res.status(200).json({
      success: true,
      message: 'Oturum başarıyla sonlandırıldı'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Çıkış işlemi başarısız'
    });
  }
};


// LOGOUT ALL CONTROLLER - POST /api/auth/logout-all
export const logoutAllController = async (req: Request, res: Response): Promise<void> => {
  try {
    await logoutAll();

    res.status(200).json({
      success: true,
      message: 'Tüm oturumlar başarıyla sonlandırıldı'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Çıkış işlemi başarısız'
    });
  }
};