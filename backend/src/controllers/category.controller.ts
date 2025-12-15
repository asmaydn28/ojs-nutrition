import { Request, Response } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../services/category.service';


// CREATE CONTROLLER - POST /api/categories
export const createCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      success: true,
      message: 'Kategori başarıyla oluşturuldu',
      data: category
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kategori oluşturulamadı';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET ALL CONTROLLER - GET /api/categories
export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Kategoriler getirilemedi'
    });
  }
};

// GET BY ID CONTROLLER - GET /api/categories/:id
export const getCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kategori bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};


// UPDATE CONTROLLER - PATCH /api/categories/:id
export const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await updateCategory(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Kategori başarıyla güncellendi',
      data: category
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kategori güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// DELETE CONTROLLER - DELETE /api/categories/:id
export const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteCategory(id);

    res.status(200).json({
      success: true,
      message: 'Kategori başarıyla silindi'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kategori silinemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};