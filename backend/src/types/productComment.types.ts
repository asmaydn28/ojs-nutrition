// Yorum oluşturma için gerekli veriler
export interface CreateProductCommentInput {
    productId: string;
    title?: string;
    content?: string;
    rating: number; // 1-5 arası
  }
  
  // Yorum güncelleme için veriler
  export interface UpdateProductCommentInput {
    title?: string;
    content?: string;
    rating?: number;
  }
  
  // Yorum response tipi
  export interface ProductCommentResponse {
    id: string;
    userId: string;
    productId: string;
    title: string | null;
    content: string | null;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    user?: {
      id: string;
      fullName: string;
      username: string;
    };
  }