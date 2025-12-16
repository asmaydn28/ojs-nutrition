import { Request, Response } from 'express';
import {
  createCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
  clearCart
} from '../services/cartItem.service';

// CREATE CONTROLLER - POST /api/cart-items
export const createCartItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    const cartItem = await createCartItem(userId, req.body);

    res.status(201).json({
      success: true,
      message: 'Ürün sepete eklendi',
      data: cartItem
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ürün sepete eklenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET ALL CONTROLLER - GET /api/cart-items
export const getCartItemsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    const cartItems = await getCartItems(userId);

    res.status(200).json({
      success: true,
      data: cartItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Sepet getirilemedi'
    });
  }
};

// GET BY ID CONTROLLER - GET /api/cart-items/:id
export const getCartItemByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    const { id } = req.params;
    const cartItem = await getCartItemById(id, userId);

    res.status(200).json({
      success: true,
      data: cartItem
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sepet öğesi bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// UPDATE CONTROLLER - PATCH /api/cart-items/:id
export const updateCartItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    const { id } = req.params;
    const cartItem = await updateCartItem(id, userId, req.body);

    res.status(200).json({
      success: true,
      message: 'Sepet öğesi güncellendi',
      data: cartItem
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sepet öğesi güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// DELETE CONTROLLER - DELETE /api/cart-items/:id
export const deleteCartItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    const { id } = req.params;
    await deleteCartItem(id, userId);

    res.status(200).json({
      success: true,
      message: 'Sepet öğesi silindi'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sepet öğesi silinemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// DELETE ALL CONTROLLER - DELETE /api/cart-items
export const clearCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Kimlik doğrulama gerekli'
      });
      return;
    }

    await clearCart(userId);

    res.status(200).json({
      success: true,
      message: 'Sepet temizlendi'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Sepet temizlenemedi'
    });
  }
};

