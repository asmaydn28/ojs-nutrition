// Prisma'dan gelen UserRole enum'unu kullan
import { $Enums } from '@prisma/client';

// Kullanıcı rolleri enum'u - Prisma'dan gelen enum'u export et
export type UserRole = $Enums.UserRole;

// Kullanıcı güncelleme için veriler
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

// Kullanıcı response tipi
export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}