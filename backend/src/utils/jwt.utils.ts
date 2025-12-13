import jwt, { Secret } from 'jsonwebtoken';
import { TokenPayload } from '../types/auth.types';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'default-secret';
const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret';

// Access Token oluştur - 15 dakika geçerli
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: '15m' });
};

// Refresh Token oluştur - 7 gün geçerli
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign({ ...payload }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Access Token doğrula
export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};

// Refresh Token doğrula
export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};