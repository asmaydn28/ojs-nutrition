import { Request, Response } from 'express';
import {
  createOrder,
  getAllOrders,
  getAllOrdersAdmin,
  getOrderById,
  updateOrder
} from '../services/order.service';
import { getUserPermissions } from '../services/permission.service';
import { PERMISSIONS } from '../constants/permissions';

// CREATE CONTROLLER - POST /api/orders
export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    const order = await createOrder(userId);

    res.status(201).json({
      success: true,
      message: 'Sipariş başarıyla oluşturuldu',
      data: order
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sipariş oluşturulamadı';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET ALL CONTROLLER - GET /api/orders
export const getAllOrdersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    // READ_ANY yetkisi varsa tüm siparişleri getir
    const permissions = await getUserPermissions(userId);
    const canReadAll = permissions.includes(PERMISSIONS.ORDERS.READ_ANY);

    const orders = canReadAll 
      ? await getAllOrdersAdmin() 
      : await getAllOrders(userId);

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Siparişler getirilemedi'
    });
  }
};

// GET BY ID CONTROLLER - GET /api/orders/:id
export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // Middleware zaten ownership kontrolü yaptı, direkt getir
    const order = await getOrderById(id);

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sipariş bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// UPDATE CONTROLLER - PATCH /api/orders/:id
export const updateOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // Middleware zaten ownership kontrolü yaptı, direkt güncelle
    const order = await updateOrder(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Sipariş güncellendi',
      data: order
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sipariş güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

