import prisma from '../config/prisma';
import { CreateCartItemInput, UpdateCartItemInput, CartItemResponse } from '../types/cartItem.types';

// CREATE - Sepete ürün ekle
export const createCartItem = async (
  userId: string,
  input: CreateCartItemInput
): Promise<CartItemResponse> => {
  // Ürün var mı kontrol et
  const product = await prisma.product.findUnique({
    where: { id: input.productId }
  });

  if (!product) {
    throw new Error('Ürün bulunamadı');
  }

  // Stok kontrolü
  if (product.stockQuantity <= 0) {
    throw new Error('Ürün stokta bulunmuyor');
  }

  if (input.quantity <= 0) {
    throw new Error('Miktar 0\'dan büyük olmalıdır');
  }

  if (input.quantity > product.stockQuantity) {
    throw new Error(`Stokta sadece ${product.stockQuantity} adet ürün bulunmaktadır`);
  }

  // Aynı ürün sepette var mı kontrol et
  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: input.productId
      }
    }
  });

  if (existingCartItem) {
    // Mevcut miktar + yeni miktar stoktan fazla olmamalı
    const newQuantity = existingCartItem.quantity + input.quantity;
    if (newQuantity > product.stockQuantity) {
      throw new Error(`Stokta sadece ${product.stockQuantity} adet ürün bulunmaktadır. Sepette zaten ${existingCartItem.quantity} adet var`);
    }

    // Miktarı artır
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: newQuantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            stockQuantity: true,
            primaryPhotoUrl: true
          }
        }
      }
    });

    return {
      ...updatedCartItem,
      product: {
        ...updatedCartItem.product,
        price: Number(updatedCartItem.product.price)
      }
    };
  }

  // Yeni sepet öğesi oluştur
  const cartItem = await prisma.cartItem.create({
    data: {
      userId,
      productId: input.productId,
      quantity: input.quantity
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          stockQuantity: true,
          primaryPhotoUrl: true
        }
      }
    }
  });

  return {
    ...cartItem,
    product: {
      ...cartItem.product,
      price: Number(cartItem.product.price)
    }
  };
};

// GET ALL - Kullanıcının sepetini getir
export const getCartItems = async (userId: string): Promise<CartItemResponse[]> => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          stockQuantity: true,
          primaryPhotoUrl: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return cartItems.map(item => ({
    ...item,
    product: {
      ...item.product,
      price: Number(item.product.price)
    }
  }));
};

// GET BY ID - Sepet öğesini getir
export const getCartItemById = async (
  id: string,
  userId: string
): Promise<CartItemResponse> => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          stockQuantity: true,
          primaryPhotoUrl: true
        }
      }
    }
  });

  if (!cartItem) {
    throw new Error('Sepet öğesi bulunamadı');
  }

  // Kullanıcı sadece kendi sepetini görebilir
  if (cartItem.userId !== userId) {
    throw new Error('Bu sepet öğesine erişim yetkiniz yok');
  }

  return {
    ...cartItem,
    product: {
      ...cartItem.product,
      price: Number(cartItem.product.price)
    }
  };
};

// UPDATE - Sepet öğesini güncelle
export const updateCartItem = async (
  id: string,
  userId: string,
  input: UpdateCartItemInput
): Promise<CartItemResponse> => {
  const existingCartItem = await prisma.cartItem.findUnique({
    where: { id },
    include: {
      product: {
        select: {
          id: true,
          stockQuantity: true
        }
      }
    }
  });

  if (!existingCartItem) {
    throw new Error('Sepet öğesi bulunamadı');
  }

  // Kullanıcı sadece kendi sepetini güncelleyebilir
  if (existingCartItem.userId !== userId) {
    throw new Error('Bu sepet öğesini güncelleme yetkiniz yok');
  }

  // Miktar kontrolü
  if (input.quantity <= 0) {
    throw new Error('Miktar 0\'dan büyük olmalıdır');
  }

  // Stok kontrolü
  if (input.quantity > existingCartItem.product.stockQuantity) {
    throw new Error(`Stokta sadece ${existingCartItem.product.stockQuantity} adet ürün bulunmaktadır`);
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: { id },
    data: { quantity: input.quantity },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          stockQuantity: true,
          primaryPhotoUrl: true
        }
      }
    }
  });

  return {
    ...updatedCartItem,
    product: {
      ...updatedCartItem.product,
      price: Number(updatedCartItem.product.price)
    }
  };
};

// DELETE - Sepet öğesini sil
export const deleteCartItem = async (id: string, userId: string): Promise<void> => {
  const existingCartItem = await prisma.cartItem.findUnique({
    where: { id }
  });

  if (!existingCartItem) {
    throw new Error('Sepet öğesi bulunamadı');
  }

  // Kullanıcı sadece kendi sepetini silebilir
  if (existingCartItem.userId !== userId) {
    throw new Error('Bu sepet öğesini silme yetkiniz yok');
  }

  await prisma.cartItem.delete({
    where: { id }
  });
};

// DELETE ALL - Kullanıcının tüm sepetini temizle
export const clearCart = async (userId: string): Promise<void> => {
  await prisma.cartItem.deleteMany({
    where: { userId }
  });
};

