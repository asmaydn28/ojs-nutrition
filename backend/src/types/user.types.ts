// Kullanıcı güncelleme için veriler
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

// Kullanıcı response tipi
export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}