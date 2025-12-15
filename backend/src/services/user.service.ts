import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import { UpdateUserInput, UserResponse } from '../types/user.types';

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
      updatedAt: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return users;
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

  return user;
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

  return updatedUser;
};

