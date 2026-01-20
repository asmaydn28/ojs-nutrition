import { useAuthStore } from '@/store/auth';
import { API_BASE_URL } from './config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

/* Token ile API çağrısı yapar, 401 hatası alınırsa otomatik logout yapar */
export async function authenticatedFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { accessToken, logout } = useAuthStore.getState();

  if (!accessToken) {
    logout();
    throw new Error('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
  }

  const { method = 'GET', body, headers = {} } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  /* Token süresi dolmuşsa veya geçersizse otomatik çıkış yap */
  if (response.status === 401) {
    logout();
    throw new Error('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || errorData.error || `İşlem başarısız (${response.status})`;
    throw new Error(message);
  }

  const json = await response.json();
  
  if (json.status === 'success' && json.data) {
    return json.data as T;
  }
  
  return json as T;
}

/* GET isteği için kısa yol */
export function authGet<T>(endpoint: string): Promise<T> {
  return authenticatedFetch<T>(endpoint, { method: 'GET' });
}

/* POST isteği için kısa yol */
export function authPost<T>(endpoint: string, body: unknown): Promise<T> {
  return authenticatedFetch<T>(endpoint, { method: 'POST', body });
}

/* PUT isteği için kısa yol */
export function authPut<T>(endpoint: string, body: unknown): Promise<T> {
  return authenticatedFetch<T>(endpoint, { method: 'PUT', body });
}

/* DELETE isteği için kısa yol */
export function authDelete<T>(endpoint: string): Promise<T> {
  return authenticatedFetch<T>(endpoint, { method: 'DELETE' });
}
