import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import { UpdateUserInput, UserResponse } from '../types/user.types';

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

// GET ALL - Tüm kullanıcıları getir
export const getAllUsers = async (): Promise<UserResponse[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      fullName: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      roles: {
        include: {
          role: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    roles: user.roles.map(ur => ur.role.name),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }));
};

// GET BY ID - ID ile kullanıcı getir
export const getUserById = async (id: string): Promise<UserResponse> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      fullName: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  // Kullanıcının rollerini getir
  const roles = await getUserRoleNames(id);

  return {
    ...user,
    roles
  };
};

// UPDATE - Kullanıcı güncelle
export const updateUser = async (id: string, input: UpdateUserInput): Promise<UserResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!existingUser) {
    throw new Error('Kullanıcı bulunamadı');
  }

  // Email veya username değişiyorsa kontrol et
  if (input.email && input.email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (emailExists) {
      throw new Error('Bu email zaten kullanımda');
    }
  }

  if (input.username && input.username !== existingUser.username) {
    const usernameExists = await prisma.user.findUnique({
      where: { username: input.username }
    });

    if (usernameExists) {
      throw new Error('Bu kullanıcı adı zaten kullanımda');
    }
  }

  // Şifre değişiyorsa hashle
  const updateData: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
  } = { ...input };
  
  if (input.password) {
    updateData.password = await bcrypt.hash(input.password, 10);
  }

  // İsim veya soyisim değişiyorsa fullName'i güncelle
  if (input.firstName || input.lastName) {
    const firstName = input.firstName ?? existingUser.firstName;
    const lastName = input.lastName ?? existingUser.lastName;
    updateData.fullName = `${firstName} ${lastName}`;
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      fullName: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });

  // Kullanıcının rollerini getir
  const roles = await getUserRoleNames(id);

  return {
    ...updatedUser,
    roles
  };
};

