// API Base URL
// Production'da Netlify Functions proxy kullanılır (Origin sorunu için)
// Development'ta doğrudan API'ye istek atılır
const isDevelopment = import.meta.env.DEV;
export const API_BASE_URL = isDevelopment 
  ? "https://fe1111.projects.academy.onlyjs.com/api/v1"
  : "/.netlify/functions/api-proxy";

// Varsayılan limit değeri (sayfa başına ürün sayısı)
export const DEFAULT_LIMIT = 12;

