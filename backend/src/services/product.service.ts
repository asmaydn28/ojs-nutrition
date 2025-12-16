import prisma from '../config/prisma';
import { CreateProductInput, UpdateProductInput, ProductQueryParams } from '../types/product.types';
import { Decimal } from '@prisma/client/runtime/library';

// HELPER - Decimal'ı number'a çevir
const formatProduct = (product: {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortExplanation: string | null;
  longExplanation: string | null;
  price: Decimal;
  primaryPhotoUrl: string | null;
  commentCount: number;
  averageStar: Decimal | null;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  ...product,
  price: Number(product.price),
  averageStar: product.averageStar ? Number(product.averageStar) : null
});

// CREATE - Yeni ürün oluştur
export const createProduct = async (input: CreateProductInput) => {
  // Slug zaten var mı kontrol et
  const existingProduct = await prisma.product.findUnique({
    where: { slug: input.slug }
  });

  if (existingProduct) {
    throw new Error('Bu slug zaten kullanımda');
  }

  // Kategori var mı kontrol et
  const category = await prisma.category.findUnique({
    where: { id: input.categoryId }
  });

  if (!category) {
    throw new Error('Kategori bulunamadı');
  }

  // Ürünü oluştur
  const product = await prisma.product.create({
    data: {
      categoryId: input.categoryId,
      name: input.name,
      slug: input.slug,
      shortExplanation: input.shortExplanation,
      longExplanation: input.longExplanation,
      price: input.price,
      primaryPhotoUrl: input.primaryPhotoUrl,
      stockQuantity: input.stockQuantity ?? 0
    }
  });

  return formatProduct(product);
};

// GET ALL - Tüm ürünleri getir (filtreleme ve sayfalama)
export const getAllProducts = async (params: ProductQueryParams) => {
  const { categoryId, search, page = 1, limit = 10, min_price, max_price, min_rating, sort } = params;
  const skip = (page - 1) * limit;

  // Where koşullarını oluştur
  const where: {
    categoryId?: string;
    name?: { contains: string; mode: 'insensitive' };
    price?: { gte?: number; lte?: number };
    averageStar?: { gte?: number };
  } = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }

  // Fiyat filtreleme
  if (min_price !== undefined || max_price !== undefined) {
    where.price = {};
    if (min_price !== undefined) {
      where.price.gte = min_price;
    }
    if (max_price !== undefined) {
      where.price.lte = max_price;
    }
  }

  // Ortalama puan filtreleme
  if (min_rating !== undefined) {
    where.averageStar = { gte: min_rating };
  }

  // Toplam sayıyı al
  const total = await prisma.product.count({ where });

  // Sıralama belirleme
  let orderBy: { price?: 'asc' | 'desc'; averageStar?: 'asc' | 'desc'; createdAt?: 'asc' | 'desc' } = { createdAt: 'desc' };

  if (sort) {
    const [field, direction] = sort.split(':');
    const orderDirection = direction === 'asc' ? 'asc' : 'desc';

    if (field === 'price') {
      orderBy = { price: orderDirection };
    } else if (field === 'rating') {
      orderBy = { averageStar: orderDirection };
    } else if (field === 'createdAt') {
      orderBy = { createdAt: orderDirection };
    }
  }

  // Ürünleri getir
  const products = await prisma.product.findMany({
    where,
    skip,
    take: limit,
    orderBy,
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      }
    }
  });

  return {
    data: products.map(formatProduct),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

// GET BY ID - ID ile ürün getir
export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      }
    }
  });

  if (!product) {
    throw new Error('Ürün bulunamadı');
  }

  return formatProduct(product);
};

// GET BY SLUG - Slug ile ürün getir
export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      }
    }
  });

  if (!product) {
    throw new Error('Ürün bulunamadı');
  }

  return formatProduct(product);
};

// UPDATE - Ürün güncelle
export const updateProduct = async (id: string, input: UpdateProductInput) => {
  // Ürün var mı kontrol et
  const existingProduct = await prisma.product.findUnique({
    where: { id }
  });

  if (!existingProduct) {
    throw new Error('Ürün bulunamadı');
  }

  // Slug değişiyorsa kontrol et
  if (input.slug && input.slug !== existingProduct.slug) {
    const slugExists = await prisma.product.findUnique({
      where: { slug: input.slug }
    });

    if (slugExists) {
      throw new Error('Bu slug zaten kullanımda');
    }
  }

  // Kategori değişiyorsa kontrol et
  if (input.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: input.categoryId }
    });

    if (!category) {
      throw new Error('Kategori bulunamadı');
    }
  }

  // Güncelle
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: input
  });

  return formatProduct(updatedProduct);
};

// DELETE - Ürün sil
export const deleteProduct = async (id: string): Promise<void> => {
  const existingProduct = await prisma.product.findUnique({
    where: { id }
  });

  if (!existingProduct) {
    throw new Error('Ürün bulunamadı');
  }

  await prisma.product.delete({
    where: { id }
  });
};