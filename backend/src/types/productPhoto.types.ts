// Fotoğraf oluşturma için gerekli veriler
export interface CreateProductPhotoInput {
    productId: string;
    url: string;
    size: number;
    isPrimary?: boolean;
    // order belirlenemez, otomatik en son sıraya eklenir
  }
  
  // Fotoğraf güncelleme için veriler
  // PDF'e göre: Sadece order ve isPrimary değiştirilebilir
  export interface UpdateProductPhotoInput {
    isPrimary?: boolean;
    order?: number;
  }
  
  // Fotoğraf response tipi
  export interface ProductPhotoResponse {
    id: string;
    productId: string;
    url: string;
    size: number;
    isPrimary: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }