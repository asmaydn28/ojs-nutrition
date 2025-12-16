import { Request, Response } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct
} from '../services/product.service';

// CREATE CONTROLLER - POST /api/products
export const createProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: 'Ürün başarıyla oluşturuldu',
      data: product
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ürün oluşturulamadı';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// GET ALL CONTROLLER - GET /api/products
export const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Query parametrelerini al
    const { categoryId, search, page, limit, min_price, max_price, min_rating, sort } = req.query;

    const result = await getAllProducts({
      categoryId: categoryId as string,
      search: search as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      min_price: min_price ? Number(min_price) : undefined,
      max_price: max_price ? Number(max_price) : undefined,
      min_rating: min_rating ? Number(min_rating) : undefined,
      sort: sort as string
    });

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Ürünler getirilemedi'
    });
  }
};

// GET BY ID CONTROLLER - GET /api/products/:id
export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ürün bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// GET BY SLUG CONTROLLER - GET /api/products/slug/:slug
export const getProductBySlugController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const product = await getProductBySlug(slug);

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ürün bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};

// UPDATE CONTROLLER - PATCH /api/products/:id
export const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await updateProduct(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Ürün başarıyla güncellendi',
      data: product
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ürün güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

// DELETE CONTROLLER - DELETE /api/products/:id
export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteProduct(id);

    res.status(200).json({
      success: true,
      message: 'Ürün başarıyla silindi'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ürün silinemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};