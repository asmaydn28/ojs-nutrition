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
      primaryPhotoUrl: input.primaryPhotoUrl
    }
  });

  return formatProduct(product);
};

// GET ALL - Tüm ürünleri getir (filtreleme ve sayfalama)
export const getAllProducts = async (params: ProductQueryParams) => {
  const { categoryId, search, page = 1, limit = 10 } = params;
  const skip = (page - 1) * limit;

  // Where koşullarını oluştur
  const where: {
    categoryId?: string;
    name?: { contains: string; mode: 'insensitive' };
  } = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }

  // Toplam sayıyı al
  const total = await prisma.product.count({ where });

  // Ürünleri getir
  const products = await prisma.product.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
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