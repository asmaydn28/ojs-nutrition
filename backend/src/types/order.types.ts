// Sipariş durumu enum'u
export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
  }
  
  // Sipariş oluşturma için veriler
  export type CreateOrderInput = Record<string, never>;
  
  // Sipariş güncelleme için veriler
  export interface UpdateOrderInput {
    status?: OrderStatus;
  }
  
  // Sipariş kalemi response tipi
  export interface OrderItemResponse {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
    product?: {
      id: string;
      name: string;
      slug: string;
    };
  }
  
  // Sipariş response tipi
  export interface OrderResponse {
    id: string;
    userId: string;
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    orderItems?: OrderItemResponse[];
  }