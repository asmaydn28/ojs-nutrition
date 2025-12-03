import { API_BASE_URL, DEFAULT_LIMIT } from "./config";

// API'den gelen ürün tipi (liste için)
export interface APIProduct {
  slug: string;
  name: string;
  short_explanation: string;
  photo_src: string;
  comment_count: number;
  average_star: number;
  price_info: {
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number | null;
    discount_percentage: number | null;
  };
}

// Ürün listesi response tipi
export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: APIProduct[];
}

// Ürün varyantı tipi
export interface ProductVariant {
  id: string;
  size: {
    gram: number;
    pieces: number;
    total_services: number;
  };
  aroma: string;
  price: {
    total_price: number;
    discounted_price: number | null;
    price_per_servings: number | null;
    discount_percentage: number | null;
  };
  photo_src: string;
  is_available: boolean;
}

// Besin içeriği tipi
export interface NutritionalContent {
  ingredients: Array<{ aroma: string | null; value: string }>;
  nutrition_facts: {
    ingredients: Array<{ name: string; amounts: string[] }>;
    portion_sizes: string[];
  };
}

// Ürün açıklaması tipi
export interface ProductExplanation {
  usage: string;
  features: string;
  description: string;
  nutritional_content: NutritionalContent;
}

// Ürün detay response tipi (API'den gelen gerçek format)
export interface ProductDetailResponse {
  id: string;
  slug: string;
  name: string;
  short_explanation: string;
  explanation: ProductExplanation;
  tags: string[];
  variants: ProductVariant[];
  comment_count: number;
  average_star: number;
}

/**
 * Çok satanlar listesini getirir
 * Postman: Products → List Best Sellers
 */
export async function getBestSellers(): Promise<APIProduct[]> {
  const response = await fetch(`${API_BASE_URL}/products/best-sellers`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const json = await response.json();
  // API { status: "success", data: [...] } formatında dönüyor
  return json.data || json.results || json;
}

/**
 * Tüm ürünleri sayfalı şekilde getirir
 * Postman: Products → Index
 * 
 * @param page - Sayfa numarası (1'den başlar)
 * @param limit - Sayfa başına ürün sayısı
 */
export async function getAllProducts(
  page: number = 1,
  limit: number = DEFAULT_LIMIT
): Promise<ProductListResponse> {
  // Offset formülü: (page - 1) * limit
  const offset = (page - 1) * limit;
  
  const response = await fetch(
    `${API_BASE_URL}/products?limit=${limit}&offset=${offset}`
  );
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const json = await response.json();
  // API { status: "success", data: {...} } veya doğrudan data dönebilir
  if (json.status === "success" && json.data) {
    return json.data;
  }
  return json;
}

/**
 * Tek bir ürünün detaylarını getirir
 * Postman: Products → Show
 * 
 * @param slug - Ürün slug'ı
 */
export async function getProductBySlug(
  slug: string
): Promise<ProductDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const json = await response.json();
  // API { status: "success", data: {...} } formatında dönebilir
  if (json.status === "success" && json.data) {
    return json.data;
  }
  return json;
}

/**
 * Ürün fotoğrafı için tam URL oluşturur
 * API'den gelen photo_src değeri relative path olabilir
 */
export function getProductImageUrl(photoSrc: string | undefined): string {
  if (!photoSrc) {
    return "/ProductCard/whey-protein.png"; // Fallback görsel
  }
  if (photoSrc.startsWith("http")) {
    return photoSrc;
  }
  // API base URL'den /api/v1 kısmını çıkarıp media path'i ekle
  const baseUrl = API_BASE_URL.replace("/api/v1", "");
  return `${baseUrl}${photoSrc}`;
}
