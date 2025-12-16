// Sepete ürün ekleme için veriler
export interface CreateCartItemInput {
    productId: string;
    quantity: number;
  }
  
  // Sepet güncelleme için veriler
  export interface UpdateCartItemInput {
    quantity: number;
  }
  
  // Sepet response tipi
  export interface CartItemResponse {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    product?: {
      id: string;
      name: string;
      slug: string;
      price: number;
      stockQuantity: number;
      primaryPhotoUrl: string | null;
    };
  }