import { Request, Response } from 'express';
import {
  createProductComment,
  getAllComments,
  getProductCommentById,
  updateProductComment,
  deleteProductComment
} from '../services/productComment.service';
import { TokenPayload } from '../types/auth.types';


// CREATE CONTROLLER - POST /api/comments
export const createProductCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as TokenPayload)?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Yetkisiz erişim'
      });
      return;
    }

    const comment = await createProductComment(userId, req.body);

    res.status(201).json({
      success: true,
      message: 'Yorum başarıyla eklendi',
      data: comment
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Yorum eklenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET ALL CONTROLLER - GET /api/comments
export const getAllCommentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_id, rating } = req.query;

    const comments = await getAllComments(
      product_id as string | undefined,
      rating ? Number(rating) : undefined
    );

    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Yorumlar getirilemedi'
    });
  }
};


// GET BY ID CONTROLLER - GET /api/comments/:id
export const getProductCommentByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const comment = await getProductCommentById(id);

    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Yorum bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};


// UPDATE CONTROLLER - PATCH /api/comments/:id
export const updateProductCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req.user as TokenPayload)?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Yetkisiz erişim'
      });
      return;
    }

    const comment = await updateProductComment(id, userId, req.body);

    res.status(200).json({
      success: true,
      message: 'Yorum başarıyla güncellendi',
      data: comment
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Yorum güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// DELETE CONTROLLER - DELETE /api/comments/:id
export const deleteProductCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req.user as TokenPayload)?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Yetkisiz erişim'
      });
      return;
    }

    await deleteProductComment(id, userId);

    res.status(200).json({
      success: true,
      message: 'Yorum başarıyla silindi'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Yorum silinemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};