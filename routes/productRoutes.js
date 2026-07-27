import express from "express";
import {
  getAllProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/category-list", getCategories);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);
router.get("/", getAllProducts);
router.post("/", createProduct);

export default router;