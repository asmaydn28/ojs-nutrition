import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router: Router = Router();

// PUBLIC ROUTES - Token gerektirmeyen--------------------------------
// GET /api/categories - Tüm kategorileri listele
router.get("/", getAllCategoriesController);

// GET /api/categories/:id - Tek kategori getir
router.get("/:id", getCategoryByIdController);

// PROTECTED ROUTES - Token gerektiren (Admin)--------------------------------
// POST /api/categories - Yeni kategori oluştur
router.post("/", authMiddleware, createCategoryController);

// PATCH /api/categories/:id - Kategori güncelle
router.patch("/:id", authMiddleware, updateCategoryController);

// DELETE /api/categories/:id - Kategori sil
router.delete("/:id", authMiddleware, deleteCategoryController);

export default router;
