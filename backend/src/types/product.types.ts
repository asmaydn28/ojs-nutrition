// Ürün oluşturma için gerekli veriler
export interface CreateProductInput {
    categoryId: string;
    name: string;
    slug: string;
    shortExplanation?: string;
    longExplanation?: string;
    price: number;
    primaryPhotoUrl?: string;
  }
  
  // Ürün güncelleme için veriler (hepsi opsiyonel)
  export interface UpdateProductInput {
    categoryId?: string;
    name?: string;
    slug?: string;
    shortExplanation?: string;
    longExplanation?: string;
    price?: number;
    primaryPhotoUrl?: string;
  }
  
  // Ürün response tipi
  export interface ProductResponse {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    shortExplanation: string | null;
    longExplanation: string | null;
    price: number;
    primaryPhotoUrl: string | null;
    commentCount: number;
    averageStar: number | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Ürün listesi için query parametreleri
  export interface ProductQueryParams {
    categoryId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }