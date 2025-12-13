import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import { RegisterInput, LoginInput, AuthResponse, TokenPayload } from '../types/auth.types';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';

// REGİSTER SERVİCE
export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  // Email veya username zaten var mı kontrol et
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: input.email },
        { username: input.username }
      ]
    }
  });

  if (existingUser) {
    throw new Error('Email veya kullanıcı adı zaten kullanımda');
  }

  // Şifreyi hashle (güvenlik için)
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // Kullanıcıyı veritabanına kaydet
  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      fullName: `${input.firstName} ${input.lastName}`,
      username: input.username,
      email: input.email,
      password: hashedPassword
    }
  });

  // Token payload oluştur
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email
  };

  // Token'ları oluştur
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Response döndür
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      username: user.username,
      email: user.email
    },
    accessToken,
    refreshToken
  };
};

// LOGİN SERVİCE
export const login = async (input: LoginInput): Promise<AuthResponse> => {
  // Kullanıcıyı email ile bul
  const user = await prisma.user.findUnique({
    where: { email: input.email }
  });

  if (!user) {
    throw new Error('Geçersiz email veya şifre');
  }

  // Şifreyi kontrol et
  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Geçersiz email veya şifre');
  }

  // Token payload oluştur
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email
  };

  // Token'ları oluştur
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Response döndür
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      username: user.username,
      email: user.email
    },
    accessToken,
    refreshToken
  };
};

// GET USER BY İD SERVİCE
export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      fullName: true,
      username: true,
      email: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  return user;
};