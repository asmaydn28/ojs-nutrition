import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";
import { PERMISSIONS } from "../constants/permissions";

const router: Router = Router();

// PUBLIC ROUTES - Token gerektirmeyen--------------------------------
// GET /api/categories - Tüm kategorileri listele
router.get("/", getAllCategoriesController);

// GET /api/categories/:id - Tek kategori getir
router.get("/:id", getCategoryByIdController);

// PROTECTED ROUTES - Token gerektiren (Admin/Moderator)--------------------------------
// POST /api/categories - Yeni kategori oluştur
router.post(
  "/",
  authMiddleware,
  requirePermission(PERMISSIONS.CATEGORIES.CREATE),
  createCategoryController
);

// PATCH /api/categories/:id - Kategori güncelle
router.patch(
  "/:id",
  authMiddleware,
  requirePermission(PERMISSIONS.CATEGORIES.UPDATE),
  updateCategoryController
);

// DELETE /api/categories/:id - Kategori sil
router.delete(
  "/:id",
  authMiddleware,
  requirePermission(PERMISSIONS.CATEGORIES.DELETE),
  deleteCategoryController
);

export default router;
