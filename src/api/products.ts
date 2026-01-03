import { API_BASE_URL, DEFAULT_LIMIT } from "./config";

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

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: APIProduct[];
}

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

export interface NutritionalContent {
  ingredients: Array<{ aroma: string | null; value: string }>;
  nutrition_facts: {
    ingredients: Array<{ name: string; amounts: string[] }>;
    portion_sizes: string[];
  };
}

export interface ProductExplanation {
  usage: string;
  features: string;
  description: string;
  nutritional_content: NutritionalContent;
}

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

export async function getBestSellers(): Promise<APIProduct[]> {
  const response = await fetch(`${API_BASE_URL}/products/best-sellers`);
  
  if (!response.ok) {
    throw new Error(`API hatası: ${response.status}`);
  }
  
  const json = await response.json();
  return json.data || json.results || json;
}

export async function getAllProducts(
  page: number = 1,
  limit: number = DEFAULT_LIMIT
): Promise<ProductListResponse> {
  const offset = (page - 1) * limit;
  
  const response = await fetch(
    `${API_BASE_URL}/products?limit=${limit}&offset=${offset}`
  );
  
  if (!response.ok) {
    throw new Error(`API hatası: ${response.status}`);
  }
  
  const json = await response.json();
  if (json.status === "success" && json.data) {
    return json.data;
  }
  return json;
}

export async function getProductBySlug(
  slug: string
): Promise<ProductDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);
  
  if (!response.ok) {
    throw new Error(`API hatası: ${response.status}`);
  }
  
  const json = await response.json();
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
    return "/ProductCard/whey-protein.png";
  }
  if (photoSrc.startsWith("http")) {
    return photoSrc;
  }
  // Resimler her zaman doğrudan API sunucusundan gelir
  const baseUrl = "https://fe1111.projects.academy.onlyjs.com";
  return `${baseUrl}${photoSrc}`;
}

export interface APIComment {
  stars?: string; 
  comment?: string; 
  title?: string; 
  created_at?: string; 
  first_name?: string;
  last_name?: string; 
  aroma?: string; 
  id?: string;
  productId?: string;
  userId?: string;
  content?: string | null;
  rating?: number; 
  createdAt?: string;
  user?: {
    id: string;
    fullName: string;
    username: string;
  };
}

export interface ProductCommentsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: APIComment[];
}


export async function getProductComments(
  productSlug: string,
  page: number = 1,
  limit: number = 10
): Promise<ProductCommentsResponse> {
  const offset = (page - 1) * limit;
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productSlug}/comments?limit=${limit}&offset=${offset}`
    );
    
    if (!response.ok) {
      console.warn(`Yorumlar getirilemedi (${response.status}): ${productSlug}`);
      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
    }
    
    const json = await response.json();
    
    if (json.status === "success" && json.data) {
      if (json.data.results && Array.isArray(json.data.results)) {
        return json.data;
      }
      if (Array.isArray(json.data)) {
        return {
          count: json.data.length,
          next: null,
          previous: null,
          results: json.data,
        };
      }
      if (json.data && typeof json.data === 'object' && json.data.results) {
        return json.data;
      }
    }
    
    if (Array.isArray(json)) {
      return {
        count: json.length,
        next: null,
        previous: null,
        results: json,
      };
    }
    
    if (json && typeof json === 'object' && json.results && Array.isArray(json.results)) {
      return json;
    }
    
    console.warn("Beklenmeyen API response formatı:", json);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  } catch (error) {
    console.error("Yorumlar çekilirken hata:", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
}