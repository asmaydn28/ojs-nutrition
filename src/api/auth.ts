import { API_BASE_URL } from "./config";

export interface RegisterRequest {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

// Auth response interface
export interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  data?: {
    access_token: string;
    refresh_token: string;
    user?: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
  status?: string;
}

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

// Kullanıcı kaydı - hata mesajları Türkçeleştirilmiş ve kullanıcı dostu
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      api_key: "123666",
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    let errorMessage = `Kayıt işlemi başarısız oldu (${response.status})`;
    
    // API hata mesajlarını Türkçeleştir ve teknik terimleri kaldır
    if (json.reason && typeof json.reason === 'object') {
      const reasonMessages = Object.entries(json.reason).map(([key, value]) => {
        // Alan isimlerini Türkçeleştir
        const fieldName = 
          key === 'username' || key === 'email' ? 'E-posta adresi' :
          key === 'password' ? 'Şifre' :
          key === 'first_name' ? 'Ad' :
          key === 'last_name' ? 'Soyad' :
          key;
        
        let message = Array.isArray(value) ? value.join(", ") : String(value);
        
        // Mesajları Türkçeleştir ve teknik terimleri kaldır
        if (message.includes('already exists') || message.includes('Username already exists')) {
          message = 'zaten kullanılıyor';
        } else if (message.includes('required')) {
          message = 'gerekli';
        } else if (message.includes('invalid')) {
          message = 'geçersiz';
        } else if (message.includes('API key')) {
          message = message.replace(/API key/gi, '');
        }
        
        return `${fieldName} ${message}`;
      });
      errorMessage = reasonMessages.join("; ");
    } else if (json.message) {
      errorMessage = json.message
        .replace(/Username already exists for the entered API key/gi, 'Bu e-posta adresi zaten kullanılıyor')
        .replace(/API key/gi, '')
        .replace(/already exists/gi, 'zaten kullanılıyor');
    } else if (json.error) {
      errorMessage = typeof json.error === 'string' 
        ? json.error.replace(/API key/gi, '').replace(/already exists/gi, 'zaten kullanılıyor')
        : JSON.stringify(json.error);
    } else if (json.detail) {
      errorMessage = typeof json.detail === 'string' 
        ? json.detail.replace(/API key/gi, '').replace(/already exists/gi, 'zaten kullanılıyor')
        : JSON.stringify(json.detail);
    } else if (json.errors) {
      if (Array.isArray(json.errors)) {
        errorMessage = json.errors
          .map((err: unknown) => String(err).replace(/API key/gi, '').replace(/already exists/gi, 'zaten kullanılıyor'))
          .join(", ");
      } else if (typeof json.errors === 'object') {
        const errorMessages = Object.entries(json.errors).map(([key, value]) => {
          const fieldName = key === 'username' || key === 'email' ? 'E-posta adresi' : key;
          const message = Array.isArray(value) ? value.join(", ") : String(value);
          return `${fieldName}: ${message}`.replace(/API key/gi, '').replace(/already exists/gi, 'zaten kullanılıyor');
        });
        errorMessage = errorMessages.join("; ");
      }
    }
    
    throw new Error(errorMessage);
  }

  if (json.status === "success" && json.data) {
    return json.data;
  }
  
  return json;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password,
      api_key: "123666",
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    const errorMessage = json.message || json.error || json.detail || `Giriş işlemi başarısız oldu (${response.status})`;
    throw new Error(errorMessage);
  }

  if (json.status === "success" && json.data) {
    return json.data;
  }
  
  return json;
}

export async function refreshToken(refreshTokenValue: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshTokenValue,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token yenileme başarısız oldu (${response.status})`);
  }

  const json = await response.json();
  return json.status === "success" && json.data ? json.data : json;
}

export async function getUserProfile(token: string): Promise<UserProfile> {
  let response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status === 404) {
    response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (!response.ok) {
    throw new Error(`Kullanıcı bilgileri alınırken bir hata oluştu (${response.status})`);
  }

  const json = await response.json();
  const data = json.status === "success" && json.data ? json.data : json;
  
  return {
    id: data.id || data.userId || 0,
    email: data.email || "",
    first_name: data.first_name || data.firstName || "",
    last_name: data.last_name || data.lastName || "",
    phone_number: data.phone_number || data.phoneNumber || data.phone || undefined,
  };
}

export async function updateUserProfile(
  token: string,
  data: Partial<UserProfile>
): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const json = await response.json().catch(() => ({ message: "Profil güncellenirken bir hata oluştu" }));
    throw new Error(json.message || `Profil güncellenirken bir hata oluştu (${response.status})`);
  }

  const json = await response.json();
  return json.status === "success" && json.data ? json.data : json;
}

