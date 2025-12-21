import prisma from '../config/prisma';
import { UpdateOrderInput, OrderResponse, OrderStatus } from '../types/order.types';
import { Decimal } from '@prisma/client/runtime/library';

// HELPER - Decimal'ı number'a çevir
const formatOrder = (order: {
  id: string;
  userId: string;
  totalPrice: Decimal;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  ...order,
  totalPrice: Number(order.totalPrice)
});

// CREATE - Sipariş oluştur (sepetten)
export const createOrder = async (userId: string): Promise<OrderResponse> => {
  // Kullanıcının sepetini getir
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: true
    }
  });

  if (cartItems.length === 0) {
    throw new Error('Sepetiniz boş');
  }

  // Stok kontrolü ve toplam fiyat hesaplama
  let totalPrice = 0;
  const orderItemsData: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }> = [];

  for (const cartItem of cartItems) {
    // Stok kontrolü
    if (cartItem.quantity > cartItem.product.stockQuantity) {
      throw new Error(`${cartItem.product.name} ürünü için yeterli stok bulunmuyor. Stokta ${cartItem.product.stockQuantity} adet var, sepetinizde ${cartItem.quantity} adet istiyorsunuz`);
    }

    const itemPrice = Number(cartItem.product.price) * cartItem.quantity;
    totalPrice += itemPrice;

    orderItemsData.push({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      unitPrice: Number(cartItem.product.price)
    });
  }

  // Transaction ile sipariş oluştur
  const order = await prisma.$transaction(async (tx) => {
    // Sipariş oluştur
    const newOrder = await tx.order.create({
      data: {
        userId,
        totalPrice,
        status: 'PENDING'
      }
    });

    // Sipariş kalemlerini oluştur
    await tx.orderItem.createMany({
      data: orderItemsData.map(item => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    });

    // Ürün stoklarını güncelle
    for (const cartItem of cartItems) {
      await tx.product.update({
        where: { id: cartItem.productId },
        data: {
          stockQuantity: {
            decrement: cartItem.quantity
          }
        }
      });
    }

    // Sepeti temizle
    await tx.cartItem.deleteMany({
      where: { userId }
    });

    // Siparişi orderItems ile birlikte getir
    return await tx.order.findUnique({
      where: { id: newOrder.id },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      }
    });
  });

  if (!order) {
    throw new Error('Sipariş oluşturulamadı');
  }

  return {
    ...formatOrder(order),
    status: order.status as OrderStatus,
    orderItems: order.orderItems.map(item => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      product: item.product
    }))
  };
};

// GET ALL - Kullanıcının siparişlerini listele
export const getAllOrders = async (userId: string): Promise<OrderResponse[]> => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return orders.map(order => ({
    ...formatOrder(order),
    status: order.status as OrderStatus,
    orderItems: order.orderItems.map(item => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      product: item.product
    }))
  }));
};

// GET ALL ADMIN - Tüm siparişleri listele (admin/moderator)
export const getAllOrdersAdmin = async (): Promise<OrderResponse[]> => {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      },
      user: {
        select: {
          id: true,
          email: true,
          fullName: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return orders.map(order => ({
    ...formatOrder(order),
    status: order.status as OrderStatus,
    orderItems: order.orderItems.map(item => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      product: item.product
    }))
  }));
};

// GET BY ID - Sipariş getir (ownership kontrolü middleware'de yapılıyor)
export const getOrderById = async (id: string): Promise<OrderResponse> => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      }
    }
  });

  if (!order) {
    throw new Error('Sipariş bulunamadı');
  }

  return {
    ...formatOrder(order),
    status: order.status as OrderStatus,
    orderItems: order.orderItems.map(item => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      product: item.product
    }))
  };
};

// UPDATE - Sipariş durumunu güncelle (ownership kontrolü middleware'de yapılıyor)
export const updateOrder = async (
  id: string,
  input: UpdateOrderInput
): Promise<OrderResponse> => {
  const existingOrder = await prisma.order.findUnique({
    where: { id }
  });

  if (!existingOrder) {
    throw new Error('Sipariş bulunamadı');
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      status: input.status
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      }
    }
  });

  return {
    ...formatOrder(updatedOrder),
    status: updatedOrder.status as OrderStatus,
    orderItems: updatedOrder.orderItems.map(item => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      product: item.product
    }))
  };
};

