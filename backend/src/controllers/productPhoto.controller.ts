import { Request, Response } from 'express';
import {
  createProductPhoto,
  getPhotosByProductId,
  getProductPhotoById,
  updateProductPhoto,
  deleteProductPhoto
} from '../services/productPhoto.service';

// CREATE CONTROLLER - POST /api/product-photos
export const createProductPhotoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const photo = await createProductPhoto(req.body);

    res.status(201).json({
      success: true,
      message: 'Fotoğraf başarıyla eklendi',
      data: photo
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fotoğraf eklenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET BY PRODUCT CONTROLLER - GET /api/products/:productId/photos
export const getPhotosByProductIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const photos = await getPhotosByProductId(productId);

    res.status(200).json({
      success: true,
      data: photos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Fotoğraflar getirilemedi'
    });
  }
};

// GET BY ID CONTROLLER - GET /api/photos/:id
export const getProductPhotoByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const photo = await getProductPhotoById(id);

    res.status(200).json({
      success: true,
      data: photo
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fotoğraf bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// UPDATE CONTROLLER - PATCH /api/photos/:id
export const updateProductPhotoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const photo = await updateProductPhoto(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Fotoğraf başarıyla güncellendi',
      data: photo
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fotoğraf güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// DELETE CONTROLLER - DELETE /api/photos/:id
export const deleteProductPhotoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteProductPhoto(id);

    res.status(200).json({
      success: true,
      message: 'Fotoğraf başarıyla silindi'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fotoğraf silinemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};