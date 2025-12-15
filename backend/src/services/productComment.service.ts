import prisma from '../config/prisma';
import { CreateProductCommentInput, UpdateProductCommentInput } from '../types/productComment.types';

// HELPER - Ürünün ortalama puanını güncelle
const updateProductAverageRating = async (productId: string): Promise<void> => {
  // Ürüne ait tüm yorumların ortalamasını hesapla
  const result = await prisma.productComment.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { rating: true }
  });

  // Ürünü güncelle
  await prisma.product.update({
    where: { id: productId },
    data: {
      averageStar: result._avg.rating ?? 0,
      commentCount: result._count.rating
    }
  });
};

// CREATE - Yeni yorum ekle
export const createProductComment = async (userId: string, input: CreateProductCommentInput) => {
  // Ürün var mı kontrol et
  const product = await prisma.product.findUnique({
    where: { id: input.productId }
  });

  if (!product) {
    throw new Error('Ürün bulunamadı');
  }

  // Rating 1-5 arası olmalı
  if (input.rating < 1 || input.rating > 5) {
    throw new Error('Puan 1-5 arası olmalıdır');
  }

  // Validasyon: Başlık null ise içerik null olmalı, içerik dolu ise başlık dolu olmalı
  if (!input.title && input.content) {
    throw new Error('Başlık null iken içerik dolu olamaz');
  }
  if (input.title && !input.content) {
    // Bu durum geçerli (başlık var, içerik yok)
  }

  // Yorumu oluştur
  const comment = await prisma.productComment.create({
    data: {
      userId,
      productId: input.productId,
      title: input.title || null,
      content: input.content || null,
      rating: input.rating
    },
    include: {
      user: {
        select: { id: true, fullName: true, username: true }
      }
    }
  });

  // Ürünün ortalama puanını güncelle
  await updateProductAverageRating(input.productId);

  return comment;
};

// GET BY PRODUCT - Ürüne ait yorumları getir
export const getCommentsByProductId = async (productId: string) => {
  const comments = await prisma.productComment.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, fullName: true, username: true }
      }
    }
  });

  return comments;
};


// GET ALL - Tüm yorumları getir
export const getAllComments = async (productId?: string, rating?: number) => {
  const where: {
    productId?: string;
    rating?: number;
  } = {};

  if (productId) {
    where.productId = productId;
  }

  if (rating) {
    where.rating = rating;
  }

  const comments = await prisma.productComment.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, fullName: true, username: true }
      }
    }
  });

  return comments;
};

// GET BY ID - ID ile yorum getir
export const getProductCommentById = async (id: string) => {
  const comment = await prisma.productComment.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, fullName: true, username: true }
      }
    }
  });

  if (!comment) {
    throw new Error('Yorum bulunamadı');
  }

  return comment;
};

// UPDATE - Yorum güncelle (sadece yorum sahibi)
export const updateProductComment = async (
  id: string,
  userId: string,
  input: UpdateProductCommentInput
) => {
  const existingComment = await prisma.productComment.findUnique({
    where: { id }
  });

  if (!existingComment) {
    throw new Error('Yorum bulunamadı');
  }

  // Sadece yorum sahibi güncelleyebilir
  if (existingComment.userId !== userId) {
    throw new Error('Bu yorumu güncelleme yetkiniz yok');
  }

  // Rating kontrolü
  if (input.rating && (input.rating < 1 || input.rating > 5)) {
    throw new Error('Puan 1-5 arası olmalıdır');
  }

  // Validasyon: Başlık null ise içerik null olmalı, içerik dolu ise başlık dolu olmalı
  const newTitle = input.title !== undefined ? input.title : existingComment.title;
  const newContent = input.content !== undefined ? input.content : existingComment.content;

  if (!newTitle && newContent) {
    throw new Error('Başlık null iken içerik dolu olamaz');
  }

  const updatedComment = await prisma.productComment.update({
    where: { id },
    data: {
      ...input,
      title: input.title !== undefined ? (input.title || null) : undefined,
      content: input.content !== undefined ? (input.content || null) : undefined
    },
    include: {
      user: {
        select: { id: true, fullName: true, username: true }
      }
    }
  });

  // Rating değiştiyse ortalamayı güncelle
  if (input.rating) {
    await updateProductAverageRating(existingComment.productId);
  }

  return updatedComment;
};

// DELETE - Yorum sil (sadece yorum sahibi)
export const deleteProductComment = async (id: string, userId: string): Promise<void> => {
  const existingComment = await prisma.productComment.findUnique({
    where: { id }
  });

  if (!existingComment) {
    throw new Error('Yorum bulunamadı');
  }

  // Sadece yorum sahibi silebilir
  if (existingComment.userId !== userId) {
    throw new Error('Bu yorumu silme yetkiniz yok');
  }

  const productId = existingComment.productId;

  await prisma.productComment.delete({
    where: { id }
  });

  // Ortalamayı güncelle
  await updateProductAverageRating(productId);
};