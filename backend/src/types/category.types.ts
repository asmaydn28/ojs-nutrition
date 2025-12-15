// Kategori oluşturma için gerekli veriler
export interface CreateCategoryInput {
    name: string;
    slug: string;
    order?: number;
  }
  
  // Kategori güncelleme için veriler
  export interface UpdateCategoryInput {
    name?: string;
    slug?: string;
    order?: number;
  }
  
  // Kategori response tipi
  export interface CategoryResponse {
    id: string;
    name: string;
    slug: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }