// kayıt olma için gerekli olan veriler
export interface RegisterInput {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

// giriş yapma için gerekli olan veriler
export interface LoginInput {
    email: string;
    password: string;
}

// jwt token için gerekli olan veriler
export interface TokenPayload {
    userId: string;
    email: string;
}

// auth response için gerekli olan veriler
export interface AuthResponse {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        fullName: string;
        username: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}