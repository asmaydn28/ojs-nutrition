// Merkezi Comment type - Backend entegrasyonu için hazır
export interface Comment {
  id: number;
  starCount: number;
  name: string;
  title: string;
  content: string;
  date: string;
  // Backend'den gelecek opsiyonel alanlar
  productName?: string; // AboutUs için ürün adı
  productLink?: string; // AboutUs için ürün linki
  isVerified?: boolean; // Doğrulanmış müşteri badge'i için
}

// Comments component variant tipleri
export type CommentsVariant = 'homepage' | 'product' | 'aboutus';

