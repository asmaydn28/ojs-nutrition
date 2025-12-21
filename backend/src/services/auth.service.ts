import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import { RegisterInput, LoginInput, AuthResponse, TokenPayload } from '../types/auth.types';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';

// HELPER - Kullanıcının rol isimlerini getir
const getUserRoleNames = async (userId: string): Promise<string[]> => {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        select: { name: true }
      }
    }
  });
  return userRoles.map(ur => ur.role.name);
};

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

  // Varsayılan USER rolünü bul
  const userRole = await prisma.role.findUnique({
    where: { name: 'USER' }
  });

  // Transaction ile kullanıcı oluştur ve rol ata
  const user = await prisma.$transaction(async (tx) => {
    // Kullanıcıyı oluştur
    const newUser = await tx.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      fullName: `${input.firstName} ${input.lastName}`,
      username: input.username,
      email: input.email,
      password: hashedPassword
    }
    });

    // Varsayılan USER rolü varsa ata
    if (userRole) {
      await tx.userRole.create({
        data: {
          userId: newUser.id,
          roleId: userRole.id
        }
      });
    }

    return newUser;
  });

  // Token payload oluştur
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email
  };

  // Token'ları oluştur
  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  // Kullanıcının rollerini getir
  const roles = await getUserRoleNames(user.id);

  // Response döndür
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      roles
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

  // Kullanıcının rollerini getir
  const roles = await getUserRoleNames(user.id);

  // Response döndür
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      roles
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

  // Kullanıcının rollerini getir
  const roles = await getUserRoleNames(userId);

  return {
    ...user,
    roles
  };
};


// LOGOUT - Mevcut oturumdan çıkış
export const logout = async (): Promise<void> => {
  // JWT stateless olduğu için server-side'da yapılacak bir işlem yok
};


// LOGOUT ALL - Tüm oturumlardan çıkış
export const logoutAll = async (): Promise<void> => {
  // JWT stateless olduğu için server-side'da yapılacak bir işlem yok
};