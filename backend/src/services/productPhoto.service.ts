import prisma from "../config/prisma";
import {
  CreateProductPhotoInput,
  UpdateProductPhotoInput,
  ProductPhotoResponse,
} from "../types/productPhoto.types";


// HELPER - Ürünün en son order numarasını bul
const getNextOrderNumber = async (productId: string): Promise<number> => {
  const lastPhoto = await prisma.productPhoto.findFirst({
    where: { productId },
    orderBy: { order: 'desc' }
  });

  return lastPhoto ? lastPhoto.order + 1 : 1;
};


// HELPER - Order numarası çakışmasını kontrol et ve düzelt
const ensureUniqueOrder = async (productId: string, excludeId?: string): Promise<void> => {
  const photos = await prisma.productPhoto.findMany({
    where: {
      productId,
      ...(excludeId ? { NOT: { id: excludeId } } : {})
    },
    orderBy: { order: 'asc' }
  });

  // Order numaralarını yeniden düzenle (1, 2, 3, ...)
  for (let i = 0; i < photos.length; i++) {
    const expectedOrder = i + 1;
    if (photos[i].order !== expectedOrder) {
      await prisma.productPhoto.update({
        where: { id: photos[i].id },
        data: { order: expectedOrder }
      });
    }
  }
};


// HELPER - Order değişikliğinde diğer fotoğrafları yeniden düzenle
const reorganizeOrders = async (
  productId: string,
  photoId: string,
  newOrder: number
): Promise<void> => {
  const photos = await prisma.productPhoto.findMany({
    where: {
      productId,
      NOT: { id: photoId }
    },
    orderBy: { order: 'asc' }
  });

  // Yeni order'dan büyük veya eşit olanları bir artır
  for (const photo of photos) {
    if (photo.order >= newOrder) {
      await prisma.productPhoto.update({
        where: { id: photo.id },
        data: { order: photo.order + 1 }
      });
    }
  }
};


// HELPER - Birincil fotoğraf zorunluluğu kontrolü
const ensurePrimaryPhoto = async (productId: string): Promise<void> => {
  const photos = await prisma.productPhoto.findMany({
    where: { productId }
  });

  // Fotoğraf varsa birincil fotoğraf zorunlu
  if (photos.length > 0) {
    const hasPrimary = photos.some(photo => photo.isPrimary);
    
    if (!hasPrimary) {
      // İlk fotoğrafı otomatik primary yap
      const firstPhoto = photos.sort((a, b) => a.order - b.order)[0];
      await prisma.productPhoto.update({
        where: { id: firstPhoto.id },
        data: { isPrimary: true }
      });

      await prisma.product.update({
        where: { id: productId },
        data: { primaryPhotoUrl: firstPhoto.url }
      });
    }
  }
};


// CREATE - Yeni fotoğraf ekle
export const createProductPhoto = async (
  input: CreateProductPhotoInput
): Promise<ProductPhotoResponse> => {
  // Ürün var mı kontrol et
  const product = await prisma.product.findUnique({
    where: { id: input.productId },
  });

  if (!product) {
    throw new Error("Ürün bulunamadı");
  }

  // Order belirlenemez, otomatik en son sıraya ekle
  const nextOrder = await getNextOrderNumber(input.productId);

  // Eğer isPrimary true ise, diğer fotoğrafların isPrimary'sini false yap
  if (input.isPrimary) {
    await prisma.productPhoto.updateMany({
      where: { productId: input.productId },
      data: { isPrimary: false },
    });

    // Ürünün primaryPhotoUrl'ini güncelle
    await prisma.product.update({
      where: { id: input.productId },
      data: { primaryPhotoUrl: input.url },
    });
  }

  // Eğer isPrimary belirtilmemişse ve bu ilk fotoğraf ise otomatik primary yap
  let shouldBePrimary = input.isPrimary ?? false;
  if (!shouldBePrimary) {
    const existingPhotos = await prisma.productPhoto.findMany({
      where: { productId: input.productId }
    });
    
    // İlk fotoğraf ise otomatik primary yap
    if (existingPhotos.length === 0) {
      shouldBePrimary = true;
    }
  }

  // Fotoğrafı oluştur
  const photo = await prisma.productPhoto.create({
    data: {
      productId: input.productId,
      url: input.url,
      size: input.size,
      isPrimary: shouldBePrimary,
      order: nextOrder, // Otomatik en son sıra
    },
  });

  // Birincil fotoğraf zorunluluğunu kontrol et
  await ensurePrimaryPhoto(input.productId);

  return photo;
};

// GET BY PRODUCT - Ürüne ait fotoğrafları getir
export const getPhotosByProductId = async (
  productId: string
): Promise<ProductPhotoResponse[]> => {
  const photos = await prisma.productPhoto.findMany({
    where: { productId },
    orderBy: { order: "asc" },
  });

  return photos;
};

// GET BY ID - ID ile fotoğraf getir
export const getProductPhotoById = async (
  id: string
): Promise<ProductPhotoResponse> => {
  const photo = await prisma.productPhoto.findUnique({
    where: { id },
  });

  if (!photo) {
    throw new Error("Fotoğraf bulunamadı");
  }

  return photo;
};


// UPDATE - Fotoğraf güncelle
export const updateProductPhoto = async (
  id: string,
  input: UpdateProductPhotoInput
): Promise<ProductPhotoResponse> => {
  const existingPhoto = await prisma.productPhoto.findUnique({
    where: { id },
  });

  if (!existingPhoto) {
    throw new Error("Fotoğraf bulunamadı");
  }

  // Order değişiyorsa kontrol et
  if (input.order !== undefined && input.order !== existingPhoto.order) {
    // Aynı order numarasından başka fotoğraf var mı kontrol et
    const conflictingPhoto = await prisma.productPhoto.findFirst({
      where: {
        productId: existingPhoto.productId,
        order: input.order,
        NOT: { id }
      }
    });

    if (conflictingPhoto) {
      throw new Error(`Bu sıra numarası (${input.order}) zaten kullanımda`);
    }

    // Order değişikliğinde diğer fotoğrafları yeniden düzenle
    await reorganizeOrders(existingPhoto.productId, id, input.order);
  }

  // Eğer isPrimary true yapılıyorsa, diğerlerini false yap
  if (input.isPrimary) {
    await prisma.productPhoto.updateMany({
      where: { productId: existingPhoto.productId, NOT: { id } },
      data: { isPrimary: false },
    });

    // Ürünün primaryPhotoUrl'ini güncelle (mevcut fotoğrafın URL'ini kullan)
    await prisma.product.update({
      where: { id: existingPhoto.productId },
      data: { primaryPhotoUrl: existingPhoto.url },
    });
  }

  const updatedPhoto = await prisma.productPhoto.update({
    where: { id },
    data: input,
  });

  // Order'ları temizle (çakışma olmaması için)
  await ensureUniqueOrder(existingPhoto.productId, id);

  // Birincil fotoğraf zorunluluğunu kontrol et
  await ensurePrimaryPhoto(existingPhoto.productId);

  return updatedPhoto;
};


// DELETE - Fotoğraf sil
export const deleteProductPhoto = async (id: string): Promise<void> => {
  const existingPhoto = await prisma.productPhoto.findUnique({
    where: { id },
  });

  if (!existingPhoto) {
    throw new Error("Fotoğraf bulunamadı");
  }

  const productId = existingPhoto.productId;

  // Fotoğrafı sil
  await prisma.productPhoto.delete({
    where: { id },
  });

  // Silinince diğer fotoğrafların sırasını yeniden ayarla
  await ensureUniqueOrder(productId);

  // Birincil fotoğraf zorunluluğunu kontrol et (otomatik düzeltecek)
  await ensurePrimaryPhoto(productId);
};
