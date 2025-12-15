import prisma from '../config/prisma';
import { CreateCategoryInput, UpdateCategoryInput, CategoryResponse } from '../types/category.types';


// CREATE - Yeni kategori oluştur
export const createCategory = async (input: CreateCategoryInput): Promise<CategoryResponse> => {
  // Slug zaten var mı kontrol et (unique olmalı)
  const existingCategory = await prisma.category.findUnique({
    where: { slug: input.slug }
  });

  if (existingCategory) {
    throw new Error('Bu slug zaten kullanımda');
  }

  // Kategoriyi oluştur
  const category = await prisma.category.create({
    data: {
      name: input.name,
      slug: input.slug,
      order: input.order ?? 0
    }
  });

  return category;
};

// GET ALL - Tüm kategorileri getir
export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  // order'a göre sıralı getir
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' }
  });

  return categories;
};

// GET BY ID - ID ile kategori getir
export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  const category = await prisma.category.findUnique({
    where: { id }
  });

  if (!category) {
    throw new Error('Kategori bulunamadı');
  }

  return category;
};


// GET BY SLUG - Slug ile kategori getir
export const getCategoryBySlug = async (slug: string): Promise<CategoryResponse> => {
  const category = await prisma.category.findUnique({
    where: { slug }
  });

  if (!category) {
    throw new Error('Kategori bulunamadı');
  }

  return category;
};

// UPDATE - Kategori güncelle
export const updateCategory = async (
  id: string,
  input: UpdateCategoryInput
): Promise<CategoryResponse> => {
  // Kategori var mı kontrol et
  const existingCategory = await prisma.category.findUnique({
    where: { id }
  });

  if (!existingCategory) {
    throw new Error('Kategori bulunamadı');
  }

  // Eğer slug değiştiriliyorsa, yeni slug başka kategoride var mı kontrol et
  if (input.slug && input.slug !== existingCategory.slug) {
    const slugExists = await prisma.category.findUnique({
      where: { slug: input.slug }
    });

    if (slugExists) {
      throw new Error('Bu slug zaten kullanımda');
    }
  }

  // Güncelle
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: input
  });

  return updatedCategory;
};

// DELETE - Kategori sil
export const deleteCategory = async (id: string): Promise<void> => {
  // Kategori var mı kontrol et
  const existingCategory = await prisma.category.findUnique({
    where: { id }
  });

  if (!existingCategory) {
    throw new Error('Kategori bulunamadı');
  }

  // Sil
  await prisma.category.delete({
    where: { id }
  });
};